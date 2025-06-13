"use client";

import { StarField } from "@/components/star-field";
import RobotLoader from "@/components/playground/RobotLoader";

export default function Home() {
  const robots = [
    {
      id: 1,
      name: "so-arm100",
      image: "/so-arm100.jpg",
      playLink: "/play/so-arm100",
      assembleLink:
        "https://github.com/huggingface/lerobot/blob/main/examples/10_use_so100.md",
    },
    {
      id: 2,
      name: "bambot v0",
      image: "/bambot_v0.jpg",
      playLink: "/play/bambot-v0",
      assembleLink: "https://github.com/timqian/bambot/tree/main/hardware",
    },
    {
      id: 3,
      name: "bambot base v0",
      image: "/bambot_v0_base.png",
      playLink: "/play/bambot-v0-base",
      assembleLink: "https://github.com/timqian/bambot/tree/main/hardware",
    },
    {
      id: 0,
      name: "sts3215 servo",
      image: "/sts3215.png",
      playLink: "/play/sts3215",
      assembleLink: "",
    },
    {
      id: 4,
      name: "so-arm101",
      image: "/so-arm100.jpg",
      playLink: "/play/so-arm101",
      assembleLink:
        "https://github.com/huggingface/lerobot/blob/main/examples/10_use_so100.md",
    },
    // {
    //   id: 3,
    //   name: "bambot base v0",
    //   image: "/bambot_v0.jpg",
    //   playLink: "/play/bambot-base-v0",
    //   assembleLink: "/assemble/bambot-base-v0",
    // },
    // Example: Add a 4th bot to test layout
    // {
    //   id: 4,
    //   name: "Example Bot 4",
    //   image: "/bambot_v0.jpg", // Use appropriate image
    //   playLink: "/play/example-bot-4",
    //   assembleLink: "/assemble/example-bot-4",
    // },
  ];

  return <RobotLoader robotName={"so-arm101"} />;
}
