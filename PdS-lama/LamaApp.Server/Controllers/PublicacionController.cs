using LamaApp.Server.Models;
using LamaApp.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LamaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionController : ControllerBase
    {
        private readonly LamaSqlContext _dbContext;
        public PublicacionController(LamaSqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ResponseApi<List<Publicacion>>> obtenerPublicaciones()
        {

            var response = new ResponseApi<List<Publicacion>>();

            var publicaciones = await _dbContext.Publicacion
                .OrderByDescending(p => p.Fecha) // Asumiendo que 'Fecha' es la propiedad que indica la fecha de creación
                .ToListAsync();

            if (publicaciones == null || !publicaciones.Any())
            {
                response.statusCode = 400;
                response.mensaje = "No se encontraron publicaciones";


            }
            else
            {
                response.response = publicaciones;
                response.statusCode = 200;
                response.mensaje = "Se obtuvieron las publicaciones correctamente";
            }

            return response;
        }



        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> CrearPublicacion(PublicacionSh publicacion)
        {
            var response = new ResponseApi<bool>();

            if (publicacion == null)
            {
                response.mensaje = "Publicación no válida.";
                response.statusCode = 400;
                response.response = false;
                return BadRequest(response);
            }

            var dbPublicacion = new Publicacion
            {
                Contenido = publicacion.Contenido,
                IdUsuario = publicacion.IdUsuario,
                Fecha = publicacion.Fecha,
                numeroLikes = 0
            };

            try
            {
                _dbContext.Publicacion.Add(dbPublicacion);
                await _dbContext.SaveChangesAsync();

                response.mensaje = "Publicación creada exitosamente";
                response.statusCode = 200;
                response.response = true;
                return Ok(response);  // Devolvemos la respuesta JSON
            }
            catch (Exception ex)
            {
                response.mensaje = $"Error al crear la publicación: {ex.Message}";
                response.statusCode = 500;
                response.response = false;
                return StatusCode(500, response);
            }
        }





    }
}
