// import React, { useState } from 'react';
// import { Home, Factory, Wind } from 'lucide-react';

// type CellType = 'empty' | 'residential' | 'commercial' | 'park' | 'solar' | 'wind';
// type Resources = {
//   money: number;
//   energy: number;
//   population: number;
// };

// type Cell = {
//   type: CellType;
//   points: number;
//   level: number;
// };

// type BuildingInfo = {
//   icon: React.ComponentType<{ className?: string }> | (() => JSX.Element);
//   points: number;
//   color: string;
//   cost: number;
//   energyUse: number;
//   population: number;
// };

// const SmartCityGame = () => {
//   const [grid, setGrid] = useState<Cell[][]>(
//     Array(6)
//       .fill(null)
//       .map(() => Array(6).fill(null).map(() => ({ type: 'empty', points: 0, level: 1 })))
//   );
//   const [selectedBuilding, setSelectedBuilding] = useState<Exclude<CellType, 'empty'>>('residential');
//   const [score, setScore] = useState(0);
//   const [resources, setResources] = useState<Resources>({
//     money: 1000,
//     energy: 100,
//     population: 0,
//   });
//   const [turn, setTurn] = useState(1);

//   const buildingTypes: Record<CellType, BuildingInfo | Record<string, never>> = {
//     empty: {},
//     residential: {
//       icon: Home,
//       points: 10,
//       color: 'text-emerald-700',
//       cost: 200,
//       energyUse: -10,
//       population: 50,
//     },
//     commercial: {
//       icon: Factory,
//       points: 15,
//       color: 'text-emerald-600',
//       cost: 300,
//       energyUse: -20,
//       population: 0,
//     },
//     park: {
//       icon: () => <span className="text-emerald-600">🌳</span>,
//       points: 5,
//       color: 'text-emerald-600',
//       cost: 100,
//       energyUse: 0,
//       population: 0,
//     },
//     solar: {
//       icon: () => <span className="text-emerald-600">☀️</span>,
//       points: 20,
//       color: 'text-emerald-600',
//       cost: 400,
//       energyUse: 30,
//       population: 0,
//     },
//     wind: {
//       icon: Wind,
//       points: 25,
//       color: 'text-emerald-600',
//       cost: 500,
//       energyUse: 40,
//       population: 0,
//     },
//   };

//   const handleCellClick = (row: number, col: number) => {
//     const building = buildingTypes[selectedBuilding] as BuildingInfo;
//     if (grid[row][col].type === 'empty' && resources.money >= building.cost) {
//       const newGrid = grid.map((r, i) =>
//         r.map((cell, j) => (i === row && j === col ? { type: selectedBuilding, points: building.points, level: 1 } : cell))
//       );
//       setGrid(newGrid);
//       setScore(score + building.points);
//       setResources({
//         money: resources.money - building.cost,
//         energy: resources.energy + building.energyUse,
//         population: resources.population + building.population,
//       });
//     }
//   };

//   const handleEndTurn = () => {
//     setTurn(turn + 1);
//     if (resources.energy < 0) {
//       alert('Game Over! Your city has run out of power!');
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-emerald-100">
//       <div className="p-6">
//         <div className="flex flex-col items-center space-y-6">
//           <h1 className="text-3xl font-bold text-emerald-800">Smart City Builder</h1>
          
//           {/* Resources Display */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-4">
//             <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm border border-emerald-100">
//               <div className="text-emerald-700 font-medium mb-1">💰 Money</div>
//               <div className="text-2xl font-bold text-emerald-900">${resources.money}</div>
//             </div>
//             <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm border border-emerald-100">
//               <div className="text-emerald-700 font-medium mb-1">⚡ Energy</div>
//               <div className="text-2xl font-bold text-emerald-900">{resources.energy}</div>
//             </div>
//             <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm border border-emerald-100">
//               <div className="text-emerald-700 font-medium mb-1">👥 Population</div>
//               <div className="text-2xl font-bold text-emerald-900">{resources.population}</div>
//             </div>
//           </div>

//           {/* Game Stats */}
//           <div className="flex justify-between w-full mb-4 px-2">
//             <div className="text-sm font-medium text-emerald-700">Turn: {turn}</div>
//             <div className="text-sm font-medium text-emerald-700">Score: {score}</div>
//           </div>

//           {/* Game Grid */}
//           <div className="grid grid-cols-6 gap-1 p-2 w-full max-w-md mx-auto bg-emerald-50 rounded-lg border border-emerald-200">
//             {grid.map((row, rowIndex) =>
//               row.map((cell, colIndex) => (
//                 <div
//                   key={`${rowIndex}-${colIndex}`}
//                   onClick={() => handleCellClick(rowIndex, colIndex)}
//                   className="aspect-square flex items-center justify-center border border-emerald-200 cursor-pointer bg-white hover:bg-emerald-100 transition-colors rounded"
//                 >
//                   {cell.type !== 'empty' && React.createElement((buildingTypes[cell.type] as BuildingInfo).icon, { 
//                     className: `${(buildingTypes[cell.type] as BuildingInfo).color} w-6 h-6 sm:w-8 sm:h-8` 
//                   })}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Building Selection */}
//           <div className="flex flex-wrap justify-center gap-3 mt-6">
//             {(Object.keys(buildingTypes) as CellType[]).filter(type => type !== 'empty').map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setSelectedBuilding(type as Exclude<CellType, 'empty'>)}
//                 className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
//                   selectedBuilding === type 
//                     ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2' 
//                     : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
//                 } transition-all`}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)} (${(buildingTypes[type] as BuildingInfo).cost})
//               </button>
//             ))}
//           </div>

//           <button 
//             onClick={handleEndTurn} 
//             className="mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-medium shadow-sm transition-colors w-full sm:w-auto"
//           >
//             End Turn
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartCityGame;

import React, { useState } from 'react';
import { Home, Factory, Wind } from 'lucide-react';

type CellType = 'empty' | 'residential' | 'commercial' | 'park' | 'solar' | 'wind';
type Resources = {
  money: number;
  energy: number;
  population: number;
};

type Cell = {
  type: CellType;
  points: number;
  level: number;
};

type BuildingInfo = {
  icon: React.ComponentType<{ className?: string }> | (() => JSX.Element);
  points: number;
  color: string;
  cost: number;
  energyUse: number;
  population: number;
};

const SmartCityGame = () => {
  const [grid, setGrid] = useState<Cell[][]>(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(null).map(() => ({ type: 'empty', points: 0, level: 1 })))
  );
  const [selectedBuilding, setSelectedBuilding] = useState<Exclude<CellType, 'empty'>>('residential');
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState<Resources>({
    money: 1000,
    energy: 100,
    population: 0,
  });
  const [turn, setTurn] = useState(1);

  const buildingTypes: Record<CellType, BuildingInfo | Record<string, never>> = {
    empty: {},
    residential: {
      icon: Home,
      points: 10,
      color: 'text-blue-700',
      cost: 200,
      energyUse: -10,
      population: 50,
    },
    commercial: {
      icon: Factory,
      points: 15,
      color: 'text-blue-600',
      cost: 300,
      energyUse: -20,
      population: 0,
    },
    park: {
      icon: () => <span className="text-blue-600">🌳</span>,
      points: 5,
      color: 'text-blue-600',
      cost: 100,
      energyUse: 0,
      population: 0,
    },
    solar: {
      icon: () => <span className="text-blue-600">☀️</span>,
      points: 20,
      color: 'text-blue-600',
      cost: 400,
      energyUse: 30,
      population: 0,
    },
    wind: {
      icon: Wind,
      points: 25,
      color: 'text-blue-600',
      cost: 500,
      energyUse: 40,
      population: 0,
    },
  };

  const handleCellClick = (row: number, col: number) => {
    const building = buildingTypes[selectedBuilding] as BuildingInfo;
    if (grid[row][col].type === 'empty' && resources.money >= building.cost) {
      const newGrid = grid.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? { type: selectedBuilding, points: building.points, level: 1 } : cell))
      );
      setGrid(newGrid);
      setScore(score + building.points);
      setResources({
        money: resources.money - building.cost,
        energy: resources.energy + building.energyUse,
        population: resources.population + building.population,
      });
    }
  };

  const handleEndTurn = () => {
    setTurn(turn + 1);
    if (resources.energy < 0) {
      alert('Game Over! Your city has run out of power!');
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-blue-200">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-800 text-center">Smart City Builder</h1>
        
        <div className="grid grid-cols-3 gap-4 text-center my-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <p className="text-blue-700 font-medium">💰 Money</p>
            <p className="text-2xl font-bold text-blue-900">${resources.money}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <p className="text-blue-700 font-medium">⚡ Energy</p>
            <p className="text-2xl font-bold text-blue-900">{resources.energy}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <p className="text-blue-700 font-medium">👥 Population</p>
            <p className="text-2xl font-bold text-blue-900">{resources.population}</p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1 p-2 w-full max-w-md mx-auto bg-blue-50 rounded-lg border border-blue-200">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className="aspect-square flex items-center justify-center border border-blue-300 cursor-pointer bg-white hover:bg-blue-200 transition-colors rounded"
              >
                {cell.type !== 'empty' && React.createElement((buildingTypes[cell.type] as BuildingInfo).icon, { 
                  className: `${(buildingTypes[cell.type] as BuildingInfo).color} w-6 h-6 sm:w-8 sm:h-8` 
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {(Object.keys(buildingTypes) as CellType[]).filter(type => type !== 'empty').map((type) => (
            <button
              key={type}
              onClick={() => setSelectedBuilding(type as Exclude<CellType, 'empty'>)}
              className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                selectedBuilding === type 
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2' 
                  : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'
              } transition-all`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} (${(buildingTypes[type] as BuildingInfo).cost})
            </button>
          ))}
        </div>

        <button 
          onClick={handleEndTurn} 
          className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium shadow-sm transition-colors w-full sm:w-auto"
        >
          End Turn
        </button>
      </div>
    </div>
  );
};

export default SmartCityGame;
