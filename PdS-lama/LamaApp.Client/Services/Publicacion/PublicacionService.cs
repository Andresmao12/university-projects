using LamaApp.Shared;
using System.Net.Http;
using System.Net.Http.Json;

namespace LamaApp.Client.Services.Publicacion
{
    public class PublicacionService : IPublicacionService
    {

        private readonly HttpClient _httpClient;
        public PublicacionService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        public async Task<List<PublicacionSh>> obtenerPublicaciones()
        {
            var result = await _httpClient.GetFromJsonAsync<ResponseApi<List<PublicacionSh>>>("api/Publicacion");
            Console.WriteLine("writeline : " + result);

            if (result.statusCode == 200)
            {
                return result.response!;
            }

            return new List<PublicacionSh>();
        }


        public async Task<ResponseApi<bool>> crearPublicacion(PublicacionSh publicacionSh, UsuarioSh usuarioSh)
        {
           
            publicacionSh.IdUsuario = usuarioSh.IdUsuario;
            // Intentamos crear la publicación
            var result = await _httpClient.PostAsJsonAsync("api/Publicacion/add", publicacionSh);

            // Verificamos si la publicación fue creada exitosamente
            if (!result.IsSuccessStatusCode)
            {
                // Opcional: Log para ver el contenido de la respuesta de error
                var errorContent = await result.Content.ReadAsStringAsync(); // Lee el contenido de la respuesta
                Console.WriteLine($"Error al crear la publicación: {errorContent}");

                return new ResponseApi<bool>
                {
                    statusCode = (int)result.StatusCode,
                    mensaje = "Error al crear la publicación",
                    response = false
                };
            }

            // Leemos la respuesta del servidor para la creación de la publicación
            var response = await result.Content.ReadFromJsonAsync<ResponseApi<bool>>();

            // Verificamos que la respuesta no sea nula
            if (response == null)
            {
                return new ResponseApi<bool>
                {
                    statusCode = 500,
                    mensaje = "Error de deserialización en la respuesta",
                    response = false
                };
            }

            // Retornamos la respuesta completa
            return response;
        }



    }
}
