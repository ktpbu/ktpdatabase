import { useParams } from "react-router-dom";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { useEffect, useState } from "react";
import axios from "axios";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

import "reactflow/dist/style.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const Dependencies = () => {
    const { subject } = useParams();
    const [loading, setLoading] = useState(false);
    const [nodes, setNodes] = useState(null);
    const [edges, setEdges] = useState(null);
    const subjectMap = {
        "computer-science": { title: "Computer Science", height: "800px" },
        "data-science": { title: "Data Science", height: "640px" },
        economics: { title: "Economics", height: "1200px" },
        "mathematics-statistics": {
            title: "Mathematics & Statistics",
            height: "800px",
        },
    };

    useEffect(() => {
        setLoading(true);
        axios
            .post(`${backend}/academics/courses/dependencies`, {
                subject: subject,
            })
            .then((res) => {
                console.log(res.data);
                setNodes(res.data.nodes);
                setEdges(res.data.edges);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [subject]);
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">
                {subjectMap[subject]["title"]} Dependency Map
            </h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Academics", path: "/academics" },
                    { title: "Courses", path: "/academics/courses" },
                ]}
                current={`${subjectMap[subject]["title"]} Dependencies`}
            />

            {!loading && nodes !== null && edges !== null ? (
                <ReactFlowProvider>
                    <div
                        className="border-2 border-solid border-black"
                        style={{ height: subjectMap[subject]["height"] }}
                    >
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            zoomOnScroll={false}
                            zoomOnPinch={false}
                            zoomOnDoubleClick={false}
                            panOnDrag={false}
                            preventScrolling={false}
                            fitView={true}
                        ></ReactFlow>
                    </div>
                </ReactFlowProvider>
            ) : null}
        </div>
    );
};

export default Dependencies;
