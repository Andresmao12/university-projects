using Microsoft.AspNetCore.Mvc;
using LamaApp.Server.Models;
using LamaApp.Shared;
using Microsoft.EntityFrameworkCore;

namespace LamaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly LamaSqlContext _dbContext;
        public EventoController(LamaSqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> ObtenerEventos()
        {
            var responseApi = new ResponseApi<List<Evento>>();
            var listEvents = new List<Evento>();

            try
            {
                foreach (var item in await _dbContext.Evento.ToListAsync())
                {
                    listEvents.Add(new Evento
                    {
                        IdEvento = item.IdEvento,
                        Titulo = item.Titulo,
                        FechaInicio = item.FechaInicio,
                        FechaFin = item.FechaFin,
                        Ubicacion = item.Ubicacion,
                        Creador = item.Creador,
                        Descripcion = item.Descripcion,
                        IdCapitulo = item.IdCapitulo,
                    });
                }


                responseApi.response = listEvents;
                responseApi.statusCode = 200;

            }
            catch (Exception ex)
            {

                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 400;

            }
            return Ok(responseApi);
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AgregarEvento(Evento evento)
        {
            var responseApi = new ResponseApi<Evento>();

            try
            {
                if (
                    string.IsNullOrEmpty(evento.FechaInicio.ToString()) || 
                    string.IsNullOrEmpty(evento.Titulo) ||
                    string.IsNullOrEmpty(evento.FechaFin.ToString()) || 
                    string.IsNullOrEmpty(evento.Ubicacion) ||
                    string.IsNullOrEmpty(evento.Descripcion) ||
                    string.IsNullOrEmpty(evento.IdCapitulo.ToString())
                    )
                {
                    responseApi.mensaje = "Todos los campos obligatorios deben estar completos.";
                    responseApi.statusCode = 400;
                    return BadRequest(responseApi);
                }

                var nuevoEvento = new Evento
                {
                    FechaInicio = evento.FechaInicio,
                    FechaFin = evento.FechaFin,
                    Titulo = evento.Titulo,
                    Ubicacion = evento.Ubicacion,
                    Creador = evento.Creador,
                    Descripcion = evento.Descripcion,
                    IdCapitulo = evento.IdCapitulo,
                };

                _dbContext.Evento.Add(nuevoEvento);
                await _dbContext.SaveChangesAsync();

                responseApi.response = nuevoEvento;
                responseApi.statusCode = 200;
            }
            catch (Exception ex)
            {
                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 400;
            }

            return Ok(responseApi);


        }

        [HttpDelete]
        [Route("delete")]
        public async Task<ActionResult<ResponseApi<bool>>> deleteEvento(int idEvento)
        {
            var responseApi = new ResponseApi<bool>();

            try
            {
                var evento = await _dbContext.Evento.FindAsync(idEvento);
                if (evento == null)
                {
                    responseApi.statusCode = 404;
                    responseApi.mensaje = "Evento no encontrado.";
                    return NotFound(responseApi);
                }

                //Eliminamos el capitulo
                _dbContext.Evento.Remove(evento);
                await _dbContext.SaveChangesAsync();


                responseApi.statusCode = 200;

                responseApi.mensaje = "Evento eliminado correctamente.";

                return Ok(responseApi);
            }
            catch (Exception ex)
            {
                responseApi.statusCode = 500;
                responseApi.mensaje = $"Ocurrió un error: {ex.Message}";
                return StatusCode(500, responseApi);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(Evento evento)
        {
            var responseApi = new ResponseApi<Evento>();

            try
            {
                if (
                    string.IsNullOrEmpty(evento.FechaInicio.ToString()) ||
                    string.IsNullOrEmpty(evento.FechaFin.ToString()) ||
                    string.IsNullOrEmpty(evento.Titulo) ||
                    string.IsNullOrEmpty(evento.Ubicacion) ||
                    string.IsNullOrEmpty(evento.Descripcion) ||
                    string.IsNullOrEmpty(evento.IdCapitulo.ToString())
                    )
                {
                    responseApi.mensaje = "Todos los campos obligatorios deben estar completos.";
                    responseApi.statusCode = 400;
                    return BadRequest(responseApi);
                }

                var eventoExistente = await _dbContext.Evento.FindAsync(evento.IdEvento);

                if (eventoExistente == null)
                {
                    // Si no se encuentra el capítulo, devolver un error
                    responseApi.mensaje = $"No se encontró el evento con ID {evento.IdEvento}.";
                    responseApi.statusCode = 404;
                    return NotFound(responseApi);
                }

                eventoExistente.FechaInicio = evento.FechaInicio;
                eventoExistente.FechaFin = evento.FechaFin;
                eventoExistente.Titulo = evento.Titulo;
                eventoExistente.Ubicacion = evento.Ubicacion;
                eventoExistente.Creador = evento.Creador;
                eventoExistente.Descripcion = evento.Descripcion;
                eventoExistente.IdCapitulo = evento.IdCapitulo;

                await _dbContext.SaveChangesAsync();

                responseApi.response = eventoExistente;
                responseApi.statusCode = 200;

                return Ok(responseApi);
            }
            catch (Exception ex)
            {
                responseApi.statusCode = 500;
                responseApi.mensaje = ex.Message;
                return StatusCode(500, responseApi);
            }
        }


    }
}
