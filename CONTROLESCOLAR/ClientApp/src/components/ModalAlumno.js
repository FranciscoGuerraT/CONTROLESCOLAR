import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";


const modeloAlumno = {
    id: 0,
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    calificacion: "",
}

const ModalAlumno = ({ mostrarModal, setMostrarModal, guardarAlumno, editar, setEditar, editarAlumno }) => {

    const [alumno, setAlumno] = useState(modeloAlumno);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setAlumno(
            {
                ...alumno,
                [e.target.name]: e.target.value
            }
        );
    }

    const enviarDatos = () => {
        if (alumno.id == 0) {
            guardarAlumno(alumno)
        } else {
            editarAlumno(alumno)
        }
    }

    useEffect(() => {
        if (editar != null) {
            setAlumno(editar);
        } else {
            setAlumno(modeloAlumno);
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {alumno.id == 0 ? "Nuevo Alumno" : "Editar Alumno"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={alumno.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Primer Apellido</Label>
                        <Input name="primerApellido" onChange={(e) => actualizaDato(e)} value={alumno.primerApellido} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Segundo Apellido</Label>
                        <Input name="segundoApellido" onChange={(e) => actualizaDato(e)} value={alumno.segundoApellido} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Calificación</Label>
                        <Input name="calificacion" onChange={(e) => actualizaDato(e)} value={alumno.calificacion} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className="me-2" onClick={enviarDatos} color="primary" size="sm" >Guardar</Button>
                <Button color="danger" onClick={() => setMostrarModal(!mostrarModal)} size="sm">Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAlumno;