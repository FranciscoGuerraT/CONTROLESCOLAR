import { useEffect, useState } from "react";
import { Button, Label, Input, Form, FormGroup, Col, Row } from "reactstrap"

const modeloAlumno = { id: 1 }


const BusquedaAlumno = ({mostrarAlumnosById }) => {

    const [alumno, setAlumno] = useState(modeloAlumno);

    const buscarMostrarAlumno = () => {
        mostrarAlumnosById(alumno.id)
    }

    const actualizaDatoBusqueda = (e) => {
        setAlumno(
            {
                ...alumno,
                [e.target.name]: e.target.value
            }
        );
    }

    
    return (
        <Row className="mt-1">
            <Col sm="1">
                <Label>Matrícula:</Label>
            </Col>
            <Col sm="2">
                <Input name="id" onChange={(e) => actualizaDatoBusqueda(e)} />
            </Col>
            <Col sm="6">
                <Button onClick={buscarMostrarAlumno} size="sm" color="success">Buscar Alumno</Button>
            </Col>
        </Row>
    )
}

export default BusquedaAlumno;