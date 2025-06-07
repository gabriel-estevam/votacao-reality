import { Card, Typography, Avatar } from "@mui/material";

interface CardVoteProps {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  disabled?: boolean;
  onClick: (id: string) => void;
}

export default function CardVote({
  id,
  name,
  image,
  selected,
  disabled = false,
  onClick,
}: Readonly<CardVoteProps>) {
  return (
    <Card
      onClick={() => !disabled && onClick(id)}
      elevation={selected ? 6 : 2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        p: 3,
        border: selected ? "3px solid #5700c9" : "1px solid #ccc",
        cursor: disabled ? "default" : "pointer",
        transition: "0.3s",
        "&:hover": {
          boxShadow: !disabled ? 6 : undefined,
        },
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {name}
      </Typography>

      <Avatar src={image} alt={name} sx={{ width: 80, height: 80 }} />
    </Card>
  );
}
