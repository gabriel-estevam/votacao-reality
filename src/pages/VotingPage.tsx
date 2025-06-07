import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../components/Header";
import CardVote from "../components/CardVote";

const participants = [
  {
    id: "1",
    name: "Alane",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mackenzie&accessories=kurt,prescription01,prescription02,round,sunglasses,wayfarers,eyepatch&clothesColor=25557c&clothingGraphic[]&facialHair[]&facialHairColor[]&facialHairProbability=0&mouth=smile",
  },
  {
    id: "2",
    name: "Beatriz",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Christian&accessories=kurt,prescription01,prescription02,round,sunglasses,wayfarers,eyepatch&clothesColor=25557c&clothingGraphic[]&facialHair[]&facialHairColor[]&facialHairProbability=0&mouth=smile",
  },
  {
    id: "3",
    name: "Raquele",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Valentina&accessories=kurt,prescription01,prescription02,round,sunglasses,wayfarers,eyepatch&clothesColor=25557c&clothingGraphic[]&eyes=happy&facialHair[]&facialHairColor[]&facialHairProbability=0&mouth=smile"
  }
];

export default function VotingPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const year = new Date().getFullYear();

  const navigate = useNavigate();
  const handleVote = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participantId: id }),
      });

      if (response.ok) {
        setHasVoted(true);
        setSelectedId(id);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        alert("Erro ao registrar voto. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters sx={{ textAlign: "center", mt: 10, px: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Voto Único: quem você quer eliminar do BBB {year.toString().slice(-2)}?
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Vote para definir quem deve deixar o Big Brother Brasil {year} no décimo terceiro Paredão da temporada!
        </Typography>

        <Stack
          direction="column"
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          {participants.map((p) => (
            <CardVote
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              selected={selectedId === p.id}
              disabled={hasVoted}
              onClick={setSelectedId}
            />
          ))}
        </Stack>
        {!hasVoted && selectedId && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleVote(selectedId)}
            sx={{ mt: 4 }}
          >
            Confirmar Voto
          </Button>
        )}

        {hasVoted && selectedId && (
          <Alert severity="success" sx={{ mt: 4 }}>
            Seu voto para {participants.find(p => p.id === selectedId)?.name} foi registrado com sucesso!
          </Alert>
        )}
      </Container>

    </>
  );
}
