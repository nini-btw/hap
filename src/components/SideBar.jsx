import * as React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Home from "./Home";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Link } from "@mui/material";

const drawerWidth = 240;

// Styled Main Content
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? `${drawerWidth - 150}px` : 0,
    marginRight: open ? `${drawerWidth - 150}px` : 0, // Ensure the right side has equal margin when drawer is open
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: "100vh",
    display: "flex", // Flexbox for centering content
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  })
);

// Drawer Header Spacer
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#fff",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  // Toggle Drawer State
  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Fixed Hamburger Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            color: open ? "inherit" : "#1e1e1e",
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: darkTheme.palette.background.paper,
              color: darkTheme.palette.text.primary,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={toggleDrawer}
        >
          <DrawerHeader />
          <List>
            <ListItem
              className="mb-4 mt-2"
              disablePadding
              sx={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center",
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Goal"} />
              </ListItemButton>
            </ListItem>
            {["Car Choice"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              padding: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              &copy;Made By{" "}
              <Link href="#" underline="always" color="inherit">
                {"Denideni Mohammed"}
              </Link>
            </Typography>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Main
          open={open}
          sx={{
            paddingTop: 0,
            margin: 0,
          }}
        >
          <DrawerHeader />
          <Home />
        </Main>
      </Box>
    </ThemeProvider>
  );
}
