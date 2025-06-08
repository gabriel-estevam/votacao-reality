import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
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

  useEffect(() => {
    document.title = "gshow | BBB";
  }, []);

  const handleVote = () => {
    if (selectedId) {
      setHasVoted(true);
    }
  };

  const handleReset = () => {
    setHasVoted(false);
    setSelectedId(null);
  };

  const selectedParticipant = participants.find(p => p.id === selectedId);

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ mt: 20, px: 2, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {!hasVoted ? (
          <>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" whiteSpace="nowrap">
              Voto Único: quem você quer eliminar do BBB {year.toString().slice(-2)}?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4} textAlign="center" whiteSpace="nowrap">
              Vote para definir quem deve deixar o Big Brother Brasil {year} no décimo terceiro Paredão da temporada!
            </Typography>

            <Stack spacing={3} alignItems="center" width="100%">
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

            {selectedId && (
              <Button
                variant="contained"
                size="large"
                onClick={handleVote}
                sx={{
                  mt: 4,
                  backgroundColor: "#4a00e0",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "100%",
                  maxWidth: 400
                }}
              >
                Confirmar Voto
              </Button>
            )}
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            minHeight="60vh"
            gap={3}
          >
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                width: "100%",
                maxWidth: 500,
                borderRadius: 2,
                backgroundColor: "#fff",
                boxShadow: "none",
                border: "1px solid #eee",
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CheckCircle sx={{ color: "green", fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Seu voto
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedParticipant?.name}
                </Typography>
              </Box>
              <Box
                component="img"
                src={selectedParticipant?.image}
                alt={selectedParticipant?.name}
                sx={{ height: 64 }}
              />
            </Paper>

            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                backgroundColor: "#4a00e0",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                width: "100%",
                maxWidth: 500,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#3600b3",
                },
              }}
            >
              Votar Novamente
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
