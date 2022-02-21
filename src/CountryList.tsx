import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useAppState } from "./hooks/useAppState";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CountryList() {
  const data = useAppState() || [];
  let navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: {
      searchTxt: "",
    },
  });
  const [fltrText, setFltrText] = useState("");
  const [maxItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  function changePage(direction: string) {
    if (direction === "prev") {
      setCurrentPage((currentPage) => currentPage - 1);
    } else if (direction === "next") {
      setCurrentPage(currentPage + 1);
    }
  }

  function simplePaging() {
    return (
      <Container maxWidth="sm">
        <Button
          variant="outlined"
          sx={{ marginRight: 28 }}
          onClick={() => changePage("prev")}
          disabled={currentPage < 2}
        >
          PREV
        </Button>
        <Button
          variant="outlined"
          onClick={() => changePage("next")}
          disabled={data?.length - 1 < currentPage * maxItemsPerPage}
        >
          NEXT
        </Button>
      </Container>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
          }}
        >
          <Container maxWidth="sm">
            <TextField
              id="standard-search"
              label="search country ..."
              type="search"
              variant="standard"
              {...register("searchTxt")}
            />
            <Button
              variant="outlined"
              onClick={() => setFltrText(watch("searchTxt").toLowerCase())}
            >
              Search
            </Button>
          </Container>
          <Container maxWidth="sm">
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                border: "1px solid #ccc",
                marginTop: 2,
                marginBottom: 2,
              }}
              aria-label="contacts"
            >
              {data &&
                data
                  .filter((c) => c.name.common.toLowerCase().includes(fltrText))
                  .slice(
                    currentPage * maxItemsPerPage - maxItemsPerPage,
                    currentPage * maxItemsPerPage
                  )
                  ?.map((country: any) => (
                    <ListItem
                      divider={true}
                      key={country.name.common}
                      disablePadding
                      disableGutters
                    >
                      <ListItemButton
                        onClick={async (event) => {
                          navigate(country.name.common, {
                            state: country,
                          });
                        }}
                      >
                        <ListItemText inset primary={country.name.common} />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </Container>
          {simplePaging()}
          <Outlet />
        </Box>
      </main>
    </ThemeProvider>
  );
}
