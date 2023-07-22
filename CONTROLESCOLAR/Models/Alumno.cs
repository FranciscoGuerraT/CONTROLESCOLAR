using System;
using System.Collections.Generic;

namespace CONTROLESCOLAR.Models;

public partial class Alumno
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? PrimerApellido { get; set; }

    public string? SegundoApellido { get; set; }

    public int Estatus { get; set; }

    public double? Calificacion { get; set; }
}
