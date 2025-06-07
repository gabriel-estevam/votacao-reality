import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

const participants = [
  {
    id: "1",
    name: "Alane",
    image: "https://static.vecteezy.com/system/resources/thumbnails/019/495/178/small_2x/mulher-de-negocios-menina-avatar-usuario-pessoa-pessoas-cabelo-liso-contorno-adesivo-colorido-estilo-retro-vetor.jpg",
  },
  {
    id: "2",
    name: "Beatriz",
    image: "https://static.vecteezy.com/system/resources/thumbnails/019/495/179/small_2x/mulher-menina-avatar-usuario-pessoa-pessoas-rosa-cabelo-curto-contorno-adesivo-colorido-estilo-retro-vetor.jpg",
  },
  {
    id: "3",
    name: "Raquele",
    image: "https://static.vecteezy.com/system/resources/thumbnails/019/495/193/small_2x/avatar-usuario-mulher-menina-pessoa-pessoas-rosa-rabo-de-cavalo-duplo-contorno-adesivo-colorido-estilo-retro-vetor.jpg",
  },
];

export default function VotingPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Voto Único: quem você quer eliminar do BBB 24?
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Vote para definir quem deve deixar o Big Brother Brasil 2024 no décimo terceiro Paredão da temporada!
      </Typography>

      <Box sx={{ backgroundColor: "#f3f3f3", borderRadius: 2, p: 2, mb: 4 }}>
        <Typography variant="subtitle1">Você tem 1 voto disponível.</Typography>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="center">
        {participants.map((p) => (
          <Box key={p.id} flex={1}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="medium">
                  {p.name}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="200"
                image={p.image}
                alt={`Foto de ${p.name}`}
                sx={{ objectFit: "contain", px: 4, backgroundColor: "#fff" }}
              />
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={hasVoted}
                  onClick={() => handleVote(p.id)}
                >
                  Votar
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      {hasVoted && selectedId && (
        <Alert severity="success" sx={{ mt: 4 }}>
          Seu voto para {participants.find(p => p.id === selectedId)?.name} foi registrado com sucesso!
        </Alert>
      )}
    </Container>
  );
}
