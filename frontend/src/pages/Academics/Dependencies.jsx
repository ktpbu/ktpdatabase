import { useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { useEffect, useState } from "react";
import axios from "axios";

import "reactflow/dist/style.css";
import "./Dependencies.css";

const Dependencies = () => {
    const { subject } = useParams();
    const [loading, setLoading] = useState(false);
    const [nodes, setNodes] = useState(null);
    const [edges, setEdges] = useState(null);
    const abvMap = { cs: "Computer Science" };

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                "http://localhost:3000/academics/courses/dependencies/nodes/" +
                    subject
            )

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
            .get(
                "http://localhost:3000/academics/courses/dependencies/edges/" +
                    subject
            )

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
            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {abvMap[subject]} Dependencies
                </Breadcrumb.Item>
            </Breadcrumb>

            <h2 className="text-start p-3">Computer Science Dependency Map</h2>
            {nodes !== null && edges !== null ? (
                <ReactFlowProvider>
                    <div className="reactflow-container">
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
