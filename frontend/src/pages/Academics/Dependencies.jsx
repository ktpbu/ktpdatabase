import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import "reactflow/dist/style.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const Dependencies = () => {
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        try {
            await axios.get(`${backend}/auth/google/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

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
