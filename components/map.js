'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Main component
const LinkMap = ({ currentFilePath, contentDir }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const [relatedNodes, setRelatedNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data for the current file and its relations
    const fetchLinkData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/link-map?filePath=${currentFilePath}`);
        const data = await response.json();
        setLinkData(data.currentNode);
        setRelatedNodes(data.relatedNodes);
      } catch (error) {
        console.error('Error fetching link data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinkData();
  }, [currentFilePath]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">Loading...</div>;
  }

  if (!linkData) {
    return <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">No data</div>;
  }

  // Calculate positions for the nodes in the spider map
  const calculateNodePositions = (centerX, centerY, radius, nodes) => {
    const totalNodes = nodes.length;
    return nodes.map((node, index) => {
      const angle = (2 * Math.PI * index) / totalNodes;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { node, x, y };
    });
  };

  // Render the map based on expansion state
  const renderMap = () => {
    // Base dimensions
    const baseWidth = isExpanded ? (typeof window !== 'undefined' ? window.innerWidth : 1000) : 300;
    const baseHeight = isExpanded ? (typeof window !== 'undefined' ? window.innerHeight : 800) : 300;
    const centerX = baseWidth / 2;
    const centerY = baseHeight / 2;
    const radius = isExpanded ? Math.min(baseWidth, baseHeight) * 0.35 : 100;
    
    // Calculate positions
    const nodePositions = calculateNodePositions(centerX, centerY, radius, relatedNodes);
    
    return (
      <svg width={baseWidth} height={baseHeight} className="bg-white">
        {/* Draw lines to connected nodes */}
        {nodePositions.map(({ node, x, y }) => (
          <React.Fragment key={`line-${node.id}`}>
            {linkData.linksTo.includes(node.id) && (
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={x} 
                y2={y} 
                stroke="#4338ca" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
              />
            )}
            {linkData.linksFrom.includes(node.id) && (
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={x} 
                y2={y} 
                stroke="#059669" 
                strokeWidth="2" 
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Draw central node */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={isExpanded ? 40 : 25} 
          fill="#3b82f6" 
        />
        <text 
          x={centerX} 
          y={centerY} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="white" 
          fontSize={isExpanded ? 16 : 12}
        >
          {linkData.title.length > 15 ? linkData.title.substring(0, 12) + '...' : linkData.title}
        </text>
        
        {/* Draw related nodes */}
        {nodePositions.map(({ node, x, y }) => (
          <g key={node.id} className="cursor-pointer">
            <Link href={node.path}>
              <circle 
                cx={x} 
                cy={y} 
                r={isExpanded ? 30 : 18} 
                fill={linkData.linksTo.includes(node.id) && linkData.linksFrom.includes(node.id) 
                  ? "#8b5cf6" // Bidirectional
                  : linkData.linksTo.includes(node.id) 
                    ? "#4338ca" // Outgoing
                    : "#059669" // Incoming
                } 
              />
              <text 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="white" 
                fontSize={isExpanded ? 14 : 10}
              >
                {isExpanded 
                  ? (node.title.length > 20 ? node.title.substring(0, 17) + '...' : node.title)
                  : (node.title.length > 10 ? node.title.substring(0, 7) + '...' : node.title)
                }
              </text>
            </Link>
          </g>
        ))}
      </svg>
    );
  };

  // Render the component
  return (
    <div 
      className={`link-map-container ${isExpanded ? 'fixed inset-0 z-50 bg-white bg-opacity-95' : 'w-64 h-64 rounded shadow-md'}`}
      onClick={toggleExpand}
    >
      <div className={`${isExpanded ? 'absolute top-4 right-4 z-10' : 'hidden'}`}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
          className="bg-gray-200 p-2 rounded-full"
        >
          ✕
        </button>
      </div>
      
      <div className="w-full h-full flex items-center justify-center">
        {renderMap()}
      </div>
      
      {isExpanded && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-4338ca mr-1"></div>
              <span>Outgoing links</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-059669 mr-1"></div>
              <span>Incoming links</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-8b5cf6 mr-1"></div>
              <span>Bidirectional</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkMap;