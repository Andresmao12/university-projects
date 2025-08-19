using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using LamaApp.Server.Models;
using LamaApp.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Numerics;

namespace LamaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly LamaSqlContext _dbContext;

        public UsuarioController(LamaSqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Usuario
        [HttpGet]
        [Route("Usuario")]
        public async Task<ActionResult> GetUsuarios()
        {

            var responseApi = new ResponseApi<List<UsuarioSh>>();
            var listaUsuarios = new List<UsuarioSh>();

            try
            {
                foreach (var item in await _dbContext.Usuario.ToListAsync())
                {
                    listaUsuarios.Add(new UsuarioSh
                    {
                        IdUsuario = item.IdUsuario,
                        Nombre = item.Nombre,
                        Apellido = item.Apellido,
                        Cedula = item.Cedula,
                        //Falta agregar los demas valores
                    });
                }


                responseApi.response = listaUsuarios;
                responseApi.statusCode = 200;

            }
            catch (Exception ex)
            {

                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 400;

            }

            return Ok(responseApi);
            //return await _dbContext.Usuarios.ToListAsync();
        }



        // GET: api/Usuario/5
        [HttpGet("id/{id}")]
        public async Task<ResponseApi<UsuarioSh>> GetUsuarioById(int id)
        {
            var response = new ResponseApi<UsuarioSh>();
            var usuario = await _dbContext.Usuario.FindAsync(id);

            if (usuario == null)
            {
                response.statusCode = 400;
                response.mensaje = "Usuario no encontrado";


            }
            else
            {
                response.statusCode = 200;
                var ShUsuario = new UsuarioSh
                {
                    NombreUsuario = usuario.NombreUsuario,
                    // Id del capítulo (relacion obligatoria)
                    IdCapitulo = usuario.IdCapitulo,

                    Nombre = usuario.Nombre,
                    Apellido = usuario.Apellido,
                    Cedula = usuario.Cedula,
                    FechaNacimiento = usuario.FechaNacimiento,
                    FechaRegistro = usuario.FechaRegistro,

                    // Mapeo de Contacto, verificando de que no sea null
                    Contacto = usuario.Contacto != null ? new ContactoSh
                    {
                        Direccion = usuario.Contacto.Direccion,
                        Celular = usuario.Contacto.Celular,
                        Correo = usuario.Contacto.Correo,
                    } : null,

                    // Mapeo de Pareja, verificando que Pareja no sea null
                    Pareja = usuario.Pareja != null ? new ParejaSh
                    {
                        Nombre = usuario.Pareja.Nombre,
                        Cedula = usuario.Pareja.Cedula,
                    } : null,

                    // Mapeo de Motocicleta, verificando que Motocicleta no sea null
                    Motocicleta = usuario.Motocicleta != null ? new MotocicletaSh
                    {
                        Marca = usuario.Motocicleta.Marca,
                        Modelo = usuario.Motocicleta.Modelo,
                        Placa = usuario.Motocicleta.Placa,
                        Cilindrada = usuario.Motocicleta.Cilindrada,
                    } : null
                };

                response.response = ShUsuario;
            }

            return response;
            
        }

        // GET: api/Usuario/{nombre}
        [HttpGet("nombre/{nombre}")]
        public async Task<ResponseApi<Usuario>> GetUsuarioByNombre(string nombre)
        {
            var responseApi = new ResponseApi<Usuario>();

            try
            {
                // Busca el usuario en la base de datos
                var usuario = await _dbContext.Usuario.FirstOrDefaultAsync(u => u.NombreUsuario == nombre);

                // Verifica si se encontró el usuario
                if (usuario == null)
                {
                    responseApi.mensaje = "Usuario no encontrado.";
                    responseApi.statusCode = 404;
                    return responseApi;
                }

                //Considerar mapear el usuario en caso de usarlo ya que el modelo Usuario no es accesible en el cliente

                responseApi.response = usuario; // Devuelve el objeto Usuario directamente
                responseApi.statusCode = 200;
            }
            catch (Exception ex)
            {
                responseApi.mensaje = "Error en el servicio getUsuarioByNombre: " + ex.Message;
                responseApi.statusCode = 500;
            }

            return responseApi;
        }





        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> PostUsuario(UsuarioSh usuario)
        {
            var responseApi = new ResponseApi<int>();

            try
            {

                if (string.IsNullOrEmpty(usuario.NombreUsuario) || string.IsNullOrEmpty(usuario.Contraseña) ||
                   string.IsNullOrEmpty(usuario.Nombre) || string.IsNullOrEmpty(usuario.Apellido) ||
                   string.IsNullOrEmpty(usuario.Cedula) || usuario.FechaNacimiento == default)
                {
                    responseApi.mensaje = "Todos los campos obligatorios deben estar completos.";
                    responseApi.statusCode = 400;
                    return BadRequest(responseApi);
                }

                var capituloExists = await _dbContext.Capitulo.AnyAsync(c => c.IdCapitulo == usuario.IdCapitulo);
                if (!capituloExists)
                {
                    responseApi.mensaje = "El capítulo especificado no existe.";
                    responseApi.statusCode = 404;
                    return NotFound(responseApi);
                }

                var passwordHasher = new PasswordHasher<UsuarioSh>();
                string hashedPassword = passwordHasher.HashPassword(usuario, usuario.Contraseña);

                var dbUsuario = new Usuario
                {
                    NombreUsuario = usuario.NombreUsuario,
                    Contraseña = hashedPassword,
                    // Id del capítulo
                    IdCapitulo = usuario.IdCapitulo,
                
                    Nombre = usuario.Nombre,
                    Apellido = usuario.Apellido,
                    Cedula = usuario.Cedula,
                    FechaNacimiento = usuario.FechaNacimiento,
                    FechaRegistro = DateTime.Now,

                    // Mapeo de Contacto
                    Contacto = new Contacto
                    {
                        Direccion = usuario.Contacto.Direccion,
                        Celular = usuario.Contacto.Celular,
                        Correo = usuario.Contacto.Correo,
                    },

                    // Mapeo de Pareja
                    Pareja = new Pareja
                    {
                        Nombre = usuario.Pareja.Nombre,
                        Cedula = usuario.Pareja.Cedula,
                    },

                    // Mapeo de Motocicleta
                    Motocicleta = new Motocicleta
                    {
                        Marca = usuario.Motocicleta.Marca,
                        Modelo = usuario.Motocicleta.Modelo,
                        Placa = usuario.Motocicleta.Placa,
                        Cilindrada = usuario.Motocicleta.Cilindrada,
                    }
                };

                _dbContext.Add(dbUsuario);
                //await _dbContext.SaveChangesAsync();


                try
                {
                    // Intento de guardar cambios
                    await _dbContext.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    responseApi.mensaje = "Ocurrio un error en la bd";
                    responseApi.statusCode = 400;
                    Console.WriteLine(ex.InnerException?.Message);
                }


                if (dbUsuario.IdUsuario != null)
                {
                    responseApi.response = dbUsuario.IdUsuario;
                    responseApi.statusCode = 200;
                }
                else
                {
                    responseApi.mensaje = "Ocurrio un error guardando el usuario";
                    responseApi.statusCode = 400;
                }
            }
            catch (Exception ex)
            {

                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 400;

            }

            return Ok(responseApi);
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> verifLogin([FromBody] LoginRequest loginRequest)
        {
            var responseApi = new ResponseApi<bool>();

            try
            {
                var usuario = await _dbContext.Usuario.FirstOrDefaultAsync(u => u.NombreUsuario == loginRequest.NombreUsuario);

                if (usuario == null)
                {
                    responseApi.response = false; // Usuario no encontrado
                    responseApi.mensaje = "Usuario no encontrado.";
                    responseApi.statusCode = 404;
                    return NotFound(responseApi);
                }

                var passwordHasher = new PasswordHasher<Usuario>();
                var resultado = passwordHasher.VerifyHashedPassword(usuario, usuario.Contraseña, loginRequest.PlainPassword);

                if (resultado == PasswordVerificationResult.Success)
                {
                    responseApi.response = true;
                    responseApi.statusCode = 200;
                }
                else
                {
                    responseApi.response = false;
                    responseApi.mensaje = "Contraseña incorrecta.";
                    responseApi.statusCode = 400;
                }
            }
            catch (Exception ex)
            {
                responseApi.response = false;
                responseApi.mensaje = ex.Message;
                responseApi.statusCode = 500;
            }

            return Ok(responseApi);
        }

        public class LoginRequest
        {
            public string NombreUsuario { get; set; } = string.Empty;
            public string PlainPassword { get; set; } = string.Empty;
        }


        /*
        // POST: api/Usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario([FromBody] Usuario usuario)
        {
            _dbContext.Usuarios.Add(usuario);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.ID_Usuario }, usuario);
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, [FromBody] Usuario usuario)
        {
            if (id != usuario.ID_Usuario)
            {
                return BadRequest();
            }

            _dbContext.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _dbContext.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _dbContext.Usuario.Remove(usuario);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _dbContext.Usuario.Any(e => e.IdUsuario == id);
        }

       

    }
}
