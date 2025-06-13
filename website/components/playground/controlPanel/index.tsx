"use client";

import React, { useState } from "react";
import {
  JointState,
  UpdateJointDegrees,
  UpdateJointsDegrees,
  UpdateJointSpeed,
  UpdateJointsSpeed, // Add UpdateJointsSpeed type
} from "../../../hooks/useRobotControl"; // Adjusted import path
import { RevoluteJointsTable } from "./RevoluteJointsTable"; // Updated import path
import { ContinuousJointsTable } from "./ContinuousJointsTable"; // Updated import path
import { RobotConfig } from "@/config/robotConfig";
import Link from "next/link";

// const baudRate = 1000000; // Define baud rate for serial communication - Keep if needed elsewhere, remove if only for UI

// --- Control Panel Component ---
type ControlPanelProps = {
  jointStates: JointState[]; // Use JointState type from useRobotControl
  updateJointDegrees: UpdateJointDegrees; // Updated type
  updateJointsDegrees: UpdateJointsDegrees; // Updated type
  updateJointSpeed: UpdateJointSpeed; // Updated type
  updateJointsSpeed: UpdateJointsSpeed; // Add updateJointsSpeed

  isConnected: boolean;

  connectRobot: () => void;
  disconnectRobot: () => void;
  keyboardControlMap: RobotConfig["keyboardControlMap"]; // New prop for keyboard control
  compoundMovements?: RobotConfig["compoundMovements"]; // Use type from robotConfig
};

export function ControlPanel({
  jointStates,
  updateJointDegrees,
  updateJointsDegrees,
  updateJointSpeed,
  updateJointsSpeed, // Pass updateJointsSpeed
  isConnected,
  connectRobot,
  disconnectRobot,
  keyboardControlMap, // Destructure new prop
  compoundMovements, // Destructure new prop
}: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "connecting" | "disconnecting" | "failed"
  >("idle");

  const handleConnect = async () => {
    setConnectionStatus("connecting");
    try {
      await connectRobot();
      setConnectionStatus("idle");
    } catch {
      setConnectionStatus("failed");
    }
  };

  const handleDisconnect = async () => {
    setConnectionStatus("disconnecting");
    try {
      await disconnectRobot();
    } finally {
      setConnectionStatus("idle");
    }
  };

  // Separate jointStates into revolute and continuous categories
  const revoluteJoints = jointStates.filter(
    (state) => state.jointType === "revolute"
  );
  const continuousJoints = jointStates.filter(
    (state) => state.jointType === "continuous"
  );

  if (isCollapsed) {
    return (
      <div className="absolute bottom-5 left-5 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded"
        >
          Show Controls
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-5 left-5 bg-zinc-900 bg-opacity-80 text-white p-4 rounded-lg max-h-[90vh] overflow-y-auto z-50 text-sm">
      <h3 className="mt-0 mb-4 border-b border-zinc-600 pb-1 font-bold text-base flex justify-between items-center">
        <span>Joint Controls</span>

        <button
          onClick={() => setIsCollapsed(true)}
          className="ml-2 text-xl hover:bg-zinc-800 px-2 rounded-full"
          title="Collapse"
        >
          ×
        </button>
      </h3>

      {/* Revolute Joints Table */}
      {revoluteJoints.length > 0 && (
        <RevoluteJointsTable
          joints={revoluteJoints}
          updateJointDegrees={updateJointDegrees}
          updateJointsDegrees={updateJointsDegrees}
          keyboardControlMap={keyboardControlMap}
          compoundMovements={compoundMovements}
        />
      )}

      {/* Continuous Joints Table */}
      {continuousJoints.length > 0 && (
        <ContinuousJointsTable
          joints={continuousJoints}
          updateJointSpeed={updateJointSpeed}
          updateJointsSpeed={updateJointsSpeed} // Pass updateJointsSpeed to ContinuousJointsTable
        />
      )}

      {/* Connection Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={
            connectionStatus !== "idle" && connectionStatus !== "failed"
          }
          className={`text-sm px-3 py-1.5 rounded w-full ${
            connectionStatus === "failed"
              ? "bg-orange-600 hover:bg-orange-500"
              : isConnected
              ? "bg-red-600 hover:bg-red-500"
              : "bg-blue-600 hover:bg-blue-500"
          }  "text-white"  ${
            connectionStatus !== "idle" && connectionStatus !== "failed"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {connectionStatus === "failed"
            ? "Failed. Check serial port permissions. On linux, fix it with: sudo chmod 776 /dev/ttyACM0"
            : connectionStatus === "connecting"
            ? "Connecting..."
            : connectionStatus === "disconnecting"
            ? "Disconnecting..."
            : isConnected
            ? "Disconnect Robot"
            : "Connect Real Robot"}
        </button>
      </div>
      <br />
      <Link
        className="text-blue"
        href="https://github.com/dora-bambot/dora-bambot.github.io/tree/main/website/public/URDF"
      >
        Click me to get the URDF
      </Link>
    </div>
  );
}
