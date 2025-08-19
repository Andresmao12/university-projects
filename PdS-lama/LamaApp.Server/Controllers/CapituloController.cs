using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using LamaApp.Server.Models;
using LamaApp.Shared;
using Microsoft.EntityFrameworkCore;

namespace LamaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CapituloController : ControllerBase
    {

        private readonly LamaSqlContext _dbContext;

        public CapituloController(LamaSqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Capitulo
        [HttpGet]
        [Route("Capitulo")]
        public async Task<ActionResult> GetCapitulos()
        {

            var responseApi = new ResponseApi<List<CapituloSh>>();
            var listaCaps = new List<CapituloSh>();

            try
            {
                foreach (var item in await _dbContext.Capitulo.ToListAsync())
                {
                    listaCaps.Add(new CapituloSh
                    {
                        IdCapitulo = item.IdCapitulo,
                        Nombre = item.Nombre,
                        Descripcion = item.Descripcion,
                        Pais = item.Pais,
                        Ciudad = item.Ciudad,
                    });
                }


                responseApi.response = listaCaps;
                responseApi.statusCode = 200;

            }
            catch (Exception ex)
            {

                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 400;

            }
            return Ok(responseApi);
        }



        // GET: api/Capitulo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Capitulo>> GetCapitulo(int id)
        {
            var capitulo = await _dbContext.Capitulo.FindAsync(id);

            if (capitulo == null)
            {
                return NotFound();
            }

            return capitulo;
        }

        // POST: api/Capitulo/add
        [HttpPost("add")]
        public async Task<IActionResult> PostCapitulo(CapituloSh capitulo)
        {
            var responseApi = new ResponseApi<Capitulo>();

            try
            {
                if (string.IsNullOrEmpty(capitulo.Nombre) || string.IsNullOrEmpty(capitulo.Pais) || string.IsNullOrEmpty(capitulo.Ciudad))
                {
                    responseApi.mensaje = "Todos los campos obligatorios deben estar completos.";
                    responseApi.statusCode = 400;
                    return BadRequest(responseApi);
                }

                var nuevoCapitulo = new Capitulo
                {
                    Nombre = capitulo.Nombre,
                    Descripcion = capitulo.Descripcion,
                    Pais = capitulo.Pais,
                    Ciudad = capitulo.Ciudad
                };

                _dbContext.Capitulo.Add(nuevoCapitulo);
                await _dbContext.SaveChangesAsync();

                responseApi.response = nuevoCapitulo;
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
        [Route("deleteCap")]
        public async Task<ActionResult<ResponseApi<bool>>> deleteCapitulo(int idCapitulo)
        {
            var responseApi = new ResponseApi<bool>();

            try
            {
                var capitulo = await _dbContext.Capitulo.FindAsync(idCapitulo);
                if (capitulo == null)
                {
                    responseApi.statusCode = 404;
                    responseApi.mensaje = "Capítulo no encontrado.";
                    return NotFound(responseApi);
                }

                //Eliminamos el capitulo
                _dbContext.Capitulo.Remove(capitulo);
                await _dbContext.SaveChangesAsync();


                responseApi.statusCode = 200;
                responseApi.mensaje = "Capítulo eliminado correctamente.";

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
        public async Task<IActionResult> UpdateCapitulo(CapituloSh capitulo)
        {
            var responseApi = new ResponseApi<Capitulo>();

            try
            {
                if (string.IsNullOrEmpty(capitulo.Nombre) || string.IsNullOrEmpty(capitulo.Pais) || string.IsNullOrEmpty(capitulo.Ciudad) || string.IsNullOrEmpty(capitulo.Descripcion))
                {
                    responseApi.mensaje = "Todos los campos obligatorios deben estar completos.";
                    responseApi.statusCode = 400;
                    return BadRequest(responseApi);
                }

                var capituloExistente = await _dbContext.Capitulo.FindAsync(capitulo.IdCapitulo);

                if (capituloExistente == null)
                {
                    // Si no se encuentra el capítulo, devolver un error
                    responseApi.mensaje = $"No se encontró el capítulo con ID {capitulo.IdCapitulo}.";
                    responseApi.statusCode = 404;
                    return NotFound(responseApi);
                }

                
                capituloExistente.Nombre = capitulo.Nombre;
                capituloExistente.Descripcion = capitulo.Descripcion;
                capituloExistente.Pais = capitulo.Pais;
                capituloExistente.Ciudad = capitulo.Ciudad;

                await _dbContext.SaveChangesAsync();

                responseApi.response = capituloExistente;
                responseApi.statusCode = 200;

                return Ok(responseApi);
            }
            catch (Exception ex) { 
                responseApi.statusCode=500;
                responseApi.mensaje = ex.Message;
                return StatusCode(500, responseApi);
            }
        }
    }
}
