import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight", () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "SomeImage",
          title: "SomeTitle",
          description: "SomeDescription",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = { img: "Other Image" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.spotlight.img }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Other Image");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = { title: "The Title" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.spotlight.title }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("The Title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlight = { description: "Cool description" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.spotlight.description }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Cool description");
    expect(text).toBeInTheDocument();
  });
});
