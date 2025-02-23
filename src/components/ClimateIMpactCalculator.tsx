import React, { useState, ChangeEvent } from 'react';
import { Car, Home, Plane, ShoppingBag } from 'lucide-react';

interface InputValues {
  carMiles: number;
  flightHours: number;
  homeEnergy: number;
  consumption: number;
}

interface ImpactMetrics {
  car: number;
  flights: number;
  home: number;
  consumer: number;
  total: number;
}

interface EnvironmentalEquivalents {
  trees: number;
  lightBulbs: number;
  milesDriven: number;
}

const ClimateImpactCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InputValues>({
    carMiles: 0,
    flightHours: 0,
    homeEnergy: 0,
    consumption: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateImpacts = (): ImpactMetrics => {
    const impacts = {
      car: (inputs.carMiles * 0.404) / 1000,
      flights: (inputs.flightHours * 90) / 1000,
      home: (inputs.homeEnergy / 100) * 7.5,
      consumer: (inputs.consumption / 100) * 6,
      total: 0,
    };

    impacts.total =
      Object.values(impacts).reduce((a, b) => a + b, 0) - impacts.total;
    return impacts;
  };

  const getImpactColor = (value: number): string => {
    if (value < 5) return '#22c55e'; // matches green-500
    if (value < 10) return '#eab308'; // matches yellow-500
    return '#ef4444'; // matches red-500
  };

  const getEquivalents = (totalCO2: number): EnvironmentalEquivalents => ({
    trees: Math.round(totalCO2 * 45),
    lightBulbs: Math.round(totalCO2 * 1700),
    milesDriven: Math.round(totalCO2 * 2481),
  });

  const impacts = calculateImpacts();
  const equivalents = getEquivalents(impacts.total);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Calculate Your Carbon Footprint
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
          Understanding your environmental impact is the first step toward
          making positive changes. Use our calculator to measure your carbon
          footprint and discover ways to reduce your impact on the planet.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 font-medium mb-2 text-gray-700 dark:text-gray-200">
                <Car className="w-4 h-4" />
                Miles Driven Per Year
              </label>
              <input
                type="number"
                name="carMiles"
                value={inputs.carMiles}
                onChange={handleInputChange}
                placeholder="Enter miles driven"
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium mb-2 text-gray-700 dark:text-gray-200">
                <Plane className="w-4 h-4" />
                Flight Hours Per Year
              </label>
              <input
                type="number"
                name="flightHours"
                value={inputs.flightHours}
                onChange={handleInputChange}
                placeholder="Enter flight hours"
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium mb-2 text-gray-700 dark:text-gray-200">
                <Home className="w-4 h-4" />
                Home Energy Usage
              </label>
              <input
                type="number"
                name="homeEnergy"
                value={inputs.homeEnergy}
                onChange={handleInputChange}
                placeholder="Enter % of average household (100 = average)"
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium mb-2 text-gray-700 dark:text-gray-200">
                <ShoppingBag className="w-4 h-4" />
                Consumer Goods & Services
              </label>
              <input
                type="number"
                name="consumption"
                value={inputs.consumption}
                onChange={handleInputChange}
                placeholder="Enter % of average consumption (100 = average)"
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Annual Carbon Footprint
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Car Emissions: {impacts.car.toFixed(2)} metric tons CO2e</p>
                <p>
                  Flight Emissions: {impacts.flights.toFixed(2)} metric tons
                  CO2e
                </p>
                <p>Home Energy: {impacts.home.toFixed(2)} metric tons CO2e</p>
                <p>
                  Consumption: {impacts.consumer.toFixed(2)} metric tons CO2e
                </p>
                <p
                  className="text-xl font-bold mt-4"
                  style={{ color: getImpactColor(impacts.total) }}
                >
                  Total: {impacts.total.toFixed(2)} metric tons CO2e
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Environmental Impact Equivalents
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Trees needed to offset: {equivalents.trees}</p>
                <p>
                  Equal to {equivalents.lightBulbs} light bulbs running for a
                  year
                </p>
                <p>
                  Or {equivalents.milesDriven.toLocaleString()} miles driven
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateImpactCalculator;
