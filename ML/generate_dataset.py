import pandas as pd
import random

data = []

for _ in range(1000):

    tenth_percentage = random.randint(35, 100)
    tenth_attendance = random.randint(50, 100)

    inter_percentage = random.randint(35, 100)
    inter_attendance = random.randint(50, 100)

    eligible = 1 if (
        tenth_percentage >= 70 and
        inter_percentage >= 70 and
        tenth_attendance >= 75 and
        inter_attendance >= 75
    ) else 0

    data.append([
        tenth_percentage,
        tenth_attendance,
        inter_percentage,
        inter_attendance,
        eligible
    ])

df = pd.DataFrame(
    data,
    columns=[
        "tenth_percentage",
        "tenth_attendance",
        "inter_percentage",
        "inter_attendance",
        "eligible"
    ]
)

df.to_csv("dataset.csv", index=False)

print("Dataset generated successfully")