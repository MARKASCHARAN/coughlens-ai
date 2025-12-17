import pandas as pd
import torch
from torch.utils.data import Dataset
from preprocess.pipeline import preprocess_audio


class CoughDataset(Dataset):
    def __init__(self, csv_path):
        self.df = pd.read_csv(csv_path)

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]

        # preprocess_audio RETURNS mel directly (numpy array)
        mel = preprocess_audio(row["audio_path"])

        # Convert to tensor
        mel = torch.tensor(mel, dtype=torch.float32)

        # Add channel dimension → (1, 128, T)
        mel = mel.unsqueeze(0)

        label = torch.tensor(int(row["label"]), dtype=torch.long)

        return mel, label
