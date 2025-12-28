import torch
import torch.nn as nn


class CoughCRNN(nn.Module):
    def __init__(self, num_classes=3):
        super().__init__()

        # ---------------- CNN FEATURE EXTRACTOR ----------------
        self.cnn = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d((2, 2)),

            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d((2, 2)),

            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d((2, 2))
        )

        # After pooling: 128 mel → 16 mel bins
        self.lstm = nn.LSTM(
            input_size=128 * 16,
            hidden_size=128,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.3
        )

        # ---------------- CLASSIFIER ----------------
        self.classifier = nn.Sequential(
            nn.Linear(128 * 2, 64),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(64, num_classes)
        )

    def forward(self, x):
        # x: (B, 1, 128, T)
        x = self.cnn(x)  # (B, C, F, T)

        B, C, F, T = x.shape

        # reshape → (B, T, C*F)
        x = x.permute(0, 3, 1, 2).contiguous()
        x = x.view(B, T, C * F)

        x, _ = self.lstm(x)

        # take last timestep
        x = x[:, -1, :]

        return self.classifier(x)
