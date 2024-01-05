import { useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { useEffect, useState } from "react";
import axios from "axios";

import "reactflow/dist/style.css";
import "./Dependencies.css";
import "./../page-content.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const Dependencies = () => {
    const { subject } = useParams();
    const [loading, setLoading] = useState(false);
    const [nodes, setNodes] = useState(null);
    const [edges, setEdges] = useState(null);
    const subjectMap = {
        "computer-science": { title: "Computer Science", height: "800px" },
        "data-science": { title: "Data Science", height: "640px" },
        "mathematics-statistics": {
            title: "Mathematics & Statistics",
            height: "800px",
        },
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${backend}/academics/courses/dependencies/nodes/${subject}`)

            .then((res) => {
                console.log(res.data);
                setNodes(Array.from(res.data));
                setLoading(false);
            })

            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        axios
            .get(`${backend}/academics/courses/dependencies/edges/${subject}`)

            .then((res) => {
                console.log(res.data);
                setEdges(Array.from(res.data));
                setLoading(false);
            })

            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [subject]);
    return (
        <div className="page-content">
            <h2 className="text-start p-3">
                {subjectMap[subject]["title"]} Dependency Map
            </h2>

            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {subjectMap[subject]["title"]} Dependencies
                </Breadcrumb.Item>
            </Breadcrumb>

            {nodes !== null && edges !== null ? (
                <ReactFlowProvider>
                    <div
                        className="reactflow-container"
                        style={{ height: subject[subject]["height"] }}
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
