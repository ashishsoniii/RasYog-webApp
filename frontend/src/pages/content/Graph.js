import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Content.css";
import { motion } from "framer-motion";

function Graph(props) {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://yoglabs.pythonanywhere.com/${props.topic}`,
        {
          graph: props.selectedOptionId,
          starting: props.valueStart,
          end: props.valueEnd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const plotsArray = [];
      for (let i = 1; i <= 4; i++) {
        // console.log(response.data[`plot${i}`]);
        if (response.data[`plot${i}`]) {
          const { data, layout, frames } = JSON.parse(
            response.data[`plot${i}`]
          );
          const title = layout?.title?.text || `Plot ${i}`; // set a default title if no title is found

          plotsArray.push({
            data,
            layout: { ...layout, title: { text: title }, dragmode: "pan" },
            frames,
          });
        }
      }

      setPlots(plotsArray);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.selectedOptionId) {
      setLoading(true);
      setPlots([]);

      fetchData();
    }
    // eslint-disable-next-line
  }, [props.selectedOptionId, props.valueStart, props.valueEnd]);

  useEffect(() => {
    setLoading(false);
    setPlots([]);
  }, [props.topic]);

  return (
    <>
      {props.selectedOptionId === 0 && (
        <div className="no-graph">Select any option to start Analysis!</div>
      )}
      <div className="graph-section">
        {props.selectedOptionId > 0 &&
          (loading ? (
            <motion.div
              className="boxi no-graph"
              animate={{
                scale: [1, 1.6, 1.6, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["10%", "10%", "50%", "50%", "10%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            ></motion.div>
          ) : error ? (
            <div>Error fetching data. Please try again later.</div>
          ) : (
            plots.length > 0 &&
            plots.map((plot, index) => (
              <div key={index} className="plotlyi">
                {/* {console.log(plot.frames)} */}
                <Plot
                  data={plot.data}
                  layout={plot.layout}
                  frames={plot.frames}
                  useResizeHandler={true}
                  style={{
                    width: "80%",
                    height: "70%",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    hyphens: "auto",
                  }}
                  config={{
                    scrollZoom: true,
                    displaylogo: false,
                    responsive: true,
                  }}
                />
                <br />
              </div>
            ))
          ))}
      </div>
    </>
  );
}

export default Graph;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";
// import "./Content.css";
// import { motion } from "framer-motion";

// function Graph(props) {
//   const [plots, setPlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post(
//         `https://yoglabs.pythonanywhere.com/${props.topic}`,
//         {
//           graph: props.selectedOptionId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const plotsArray = [];
//       for (let i = 1; i <= 4; i++) {
//         if (response.data[`plot${i}`]) {
//           const { data, layout } = JSON.parse(response.data[`plot${i}`]);
//           const title = layout?.title?.text || `Plot ${i}`; // set a default title if no title is found

//           plotsArray.push({
//             data,
//             layout: { ...layout, title: { text: title } },
//           });
//         }
//       }

//       setPlots(plotsArray);
//       setLoading(false);
//       setError(false);
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (props.selectedOptionId) {
//       setLoading(true);
//       setPlots([]);

//       fetchData();
//     }
//     // eslint-disable-next-line
//   }, [props.selectedOptionId]);

//   useEffect(() => {
//     setLoading(false);
//     setPlots([]);
//   }, [props.topic]);

//   return (
//     <>
//       {props.selectedOptionId === 0 && (
//         <div className="no-graph">Select any option to start Analysis!</div>
//       )}
//       <div className="graph-section">
//         {props.selectedOptionId > 0 &&
//           (loading ? (
//             <motion.div
//               className="boxi no-graph"
//               animate={{
//                 scale: [1, 1.6, 1.6, 1, 1],
//                 rotate: [0, 0, 180, 180, 0],
//                 borderRadius: ["10%", "10%", "50%", "50%", "10%"],
//               }}
//               transition={{
//                 duration: 2,
//                 ease: "easeInOut",
//                 times: [0, 0.2, 0.5, 0.8, 1],
//                 repeat: Infinity,
//                 repeatDelay: 1,
//               }}
//             ></motion.div>
//           ) : error ? (
//             <div>Error fetching data. Please try again later.</div>
//           ) : (
//             plots.length > 0 &&
//             plots.map((plot, index) => (
//               <div key={index} className="plotlyi">
//                 <Plot
//                   data={plot.data}
//                   layout={plot.layout}
//                   useResizeHandler={true}
//                   style={{
//                     width: "80%",
//                     height: "70%",
//                     overflowWrap: "break-word",
//                     wordWrap: "break-word",
//                     hyphens: "auto",
//                   }}
//                   config={{
//                     scrollZoom: true,
//                     displaylogo: false,
//                     responsive: true,
//                   }}
//                 />
//                 <br />
//               </div>
//             ))
//           ))}
//       </div>
//     </>
//   );
// }

// export default Graph;
