class AnalyticsService:

    @staticmethod
    def dashboard(user=None, payload=None):
        return {
            "speak": (
                "Here is today’s summary. "
                "Five patients were tested. "
                "Two are marked as high risk."
            ),
            "action": "ANALYTICS_DASHBOARD"
        }

    @staticmethod
    def high_risk_patients(user=None, payload=None):
        return {
            "speak": "There are two high risk patients today.",
            "action": "HIGH_RISK_PATIENTS"
        }

    @staticmethod
    def today_stats(user=None, payload=None):
        return {
            "speak": "Today, five cough tests were completed.",
            "action": "TODAY_STATS"
        }

    @staticmethod
    def monthly_trends(user=None, payload=None):
        return {
            "speak": "This month shows an increase in respiratory symptoms.",
            "action": "MONTHLY_TRENDS"
        }

    @staticmethod
    def export_csv(user=None, payload=None):
        return {
            "speak": "Analytics report exported successfully.",
            "action": "EXPORT_ANALYTICS"
        }
