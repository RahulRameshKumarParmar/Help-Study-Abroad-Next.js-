"use client";

import Grid from "@mui/material/GridLegacy";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product, setSkip } from "../store/productsSlice";
import { getProductData } from "../store/productsSlice";
import StarIcon from "@mui/icons-material/Star";
import { Search } from "@mui/icons-material";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const skip = useAppSelector((state) => state.product.skip);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${skip}`
        );
        const data = await response.json();
        dispatch(getProductData(data.products));
      } catch (error) {
        console.error("Error is:", error);
      }
    };

    fetchData();
  }, [skip]);

  const [searched, setSearched] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searched}`
        );
        const data = await response.json();
        console.log(data.products);
        setSearchResult(data.products);
      } catch (error) {
        console.error("Error is", error);
      }
    };

    handleSearch();
  }, [searched]);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Typography sx={{ textAlign: "center" }} variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search Users..."
            variant="outlined"
            sx={{ width: "75%" }}
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            sx={{ width: "25%", height: 55 }}
            variant="contained"
            onClick={handleClick}
          >
            Open Menu
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem sx={{ width: "20.5vw" }} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem sx={{ width: "20.5vw" }} onClick={handleClose}>
              Settings
            </MenuItem>
            <MenuItem sx={{ width: "20.5vw" }} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </Stack>

        <Grid container spacing={3}>
          {searched !== ""
            ? searchResult.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      padding: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        height: 300,
                        objectFit: "cover",
                        width: "100%",
                        padding: 3,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap>
                        {product.title}
                      </Typography>

                      <Typography color="text.secondary">
                        {product.price}
                      </Typography>

                      <Typography sx={{ fontSize: "20px" }} variant="body2">
                        {product.category}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        {product.rating} <StarIcon />
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small">View</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      padding: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        height: 300,
                        objectFit: "cover",
                        width: "100%",
                        padding: 3,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap>
                        {product.title}
                      </Typography>

                      <Typography color="text.secondary">
                        {product.price}
                      </Typography>

                      <Typography sx={{ fontSize: "20px" }} variant="body2">
                        {product.category}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        {product.rating} <StarIcon />
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small">View</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>

        <Stack spacing={2} alignItems="center">
          <Pagination
            count={3}
            page={skip}
            onChange={(e, value) => dispatch(setSkip(value))}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
