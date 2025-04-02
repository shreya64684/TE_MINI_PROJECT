import React, { useState } from "react";
import GaugeMeter from "./GaugeMeter"; // Assuming you have a GaugeMeter component

const CarbonFootprintScore = ({ totalCO2, cementProduced }) => {
    // Industry average CO₂ emissions per tonne of cement
    const INDUSTRY_AVERAGE_CO2 = 0.85; // tonnes of CO₂ per tonne of cement

    // Convert values to tonnes
    const totalCO2Tonnes = totalCO2 / 1000;
    const cementProducedTonnes = cementProduced / 1000;

    // Avoid division by zero
    const emissionIntensity = cementProducedTonnes > 0 ? (totalCO2Tonnes / cementProducedTonnes) : 0;

    // Scoring logic: normalize based on industry average
    let score;
    if (emissionIntensity <= 0.425) {
        score = 80 + Math.max(20 * (0.425 - emissionIntensity) / 0.425, 0);
    } else if (emissionIntensity <= INDUSTRY_AVERAGE_CO2) {
        score = 50 + (30 * (INDUSTRY_AVERAGE_CO2 - emissionIntensity) / INDUSTRY_AVERAGE_CO2);
    } else {
        score = 50 - (50 * (emissionIntensity - INDUSTRY_AVERAGE_CO2) / INDUSTRY_AVERAGE_CO2);
    }

    score = Math.max(0, Math.min(100, score)); // Ensure score is between 0-100

    return (
        <div className="flex justify-center items-center h-[40vh] bg-transparent mt-[80px] mb-8">
            <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-blue-50 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-emerald-700 tracking-tight">
                    Carbon Footprint Score
                </h2>
                <GaugeMeter percentage={Math.round(score)} />
                <p className="text-center mt-4 text-gray-600 font-medium">
                    Your carbon footprint is <span className="text-emerald-600 font-bold">
                        {Math.round(100 - score)}% {score > 50 ? "lower" : "higher"}
                    </span> than the industry average.
                </p>
            </div>
        </div>
    );
};

// Example usage: 
// <CarbonFootprintScore totalCO2={500000} cementProduced={600000} />

export default CarbonFootprintScore;
