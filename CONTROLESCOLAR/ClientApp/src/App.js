import { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button, CardFooter } from "reactstrap"
import ModalAlumno from "./components/ModalAlumno";
import TablaAlumno from "./components/TablaAlumno";
import BusquedaAlumno from "./components/BusquedaAlumno";

const App = () => {

    const [alumnos, setAlumnos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarAlumnos = async () => {
        const response = await fetch("api/alumno/Lista");

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            console.log("Errror en los datos de la vista")
        }
    }

    /*useEffect(() => {
        mostrarAlumnos()
    }, [])*/


    const guardarAlumno = async (contactos) => {
        const response = await fetch("api/alumno/Guardar", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contactos)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }
    }


    const editarAlumno = async (alumno) => {
        const response = await fetch("api/alumno/Editar", {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }
    }

    const eliminarAlumno = async (id) => {

        var respuesta = window.confirm("Desea eliminar el Alumno?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/alumno/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarAlumnos();
        }
    }

    const mostrarAlumnosById = async (id) => {
        const response = await fetch("api/alumno/ListaById/"+id);

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            console.log("Errror en los datos de la vista")
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <Row className="mt-1">
                                <Col sm="6"><h5>Lista de Alumnos</h5></Col>
                                <Col sm="3"></Col>
                                <Col sm="3">
                                    <Button onClick={() => setMostrarModal(!mostrarModal)} size="sm" color="success">Nuevo Alumno</Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <BusquedaAlumno mostrarAlumnosById={mostrarAlumnosById} />
                            <hr></hr>
                            <TablaAlumno data={alumnos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarAlumno={eliminarAlumno}
                            />
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ModalAlumno
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarAlumno={guardarAlumno}
                editar={editar}
                setEditar={setEditar}
                editarAlumno={editarAlumno}
            />
        </Container>
    )
}


export default App;


