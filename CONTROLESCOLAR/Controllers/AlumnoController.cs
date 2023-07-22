﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CONTROLESCOLAR.Models;
using Microsoft.EntityFrameworkCore;


namespace CONTROLESCOLAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        private readonly ControlEscolarContext _dbcontext;

        public AlumnoController(ControlEscolarContext context)  
        {
            _dbcontext = context;
        }


        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            List<Alumno> lista = await _dbcontext.Alumnos.OrderByDescending(a => a.Id).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]

        public async Task<IActionResult> Guardar([FromBody] Alumno request)
        {
            await _dbcontext.Alumnos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]

        public async Task<IActionResult> Editar([FromBody] Alumno request)
        {
            _dbcontext.Alumnos.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]

        public async Task<IActionResult> Eliminar(int id)
        {
            Alumno alumno = _dbcontext.Alumnos.Find(id);

            _dbcontext.Alumnos.Remove(alumno);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        [HttpGet]
        [Route("ListaById/{id:int}")]

        public async Task<IActionResult> ListaById(int Id)
        {
            
            List<Alumno> lista = await _dbcontext.Alumnos.Where(i => i.Id == Id).OrderByDescending(a => a.Id).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

    }
}
