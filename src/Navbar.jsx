import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  // Menu items with links
  const menuItems = [
    { name: "Home", link: "#" },
    { name: "Weather", link: "#" },
    { name: "About", link: "#" },
    { name: "Contact", link: "#" },
    { name: "Second Website", link: "https://sigma-project-pkma.onrender.com" }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>

          {/* Desktop Menu */}
          <div style={{ display: "flex", gap: "15px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                href={item.link}
                target="_blank"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {item.name}
              </Button>
            ))}
          </div>

        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 220 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              component="a"
              href={item.link}
              target="_blank"
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}