using LamaApp.Shared;
using System.Net.Http.Json;

namespace LamaApp.Client.Services.Capitulos
{
    public class CapituloService : ICapituloService
    {

        private readonly HttpClient _httpClient;

        public CapituloService(HttpClient httpClient) { 
            _httpClient = httpClient;
        }

        public async Task<List<CapituloSh>> GetCapitulos() {
            var response = await _httpClient.GetFromJsonAsync<ResponseApi<List<CapituloSh>>>("api/Capitulo/Capitulo");

            if (response!.statusCode == 200)
            {
                return response.response!;
            }
            else
            {
                throw new Exception(response.mensaje);
            }
        }

        public async Task<CapituloSh> GetCapitulo(int id) {
            var response = await _httpClient.GetFromJsonAsync<ResponseApi<CapituloSh>>($"api/Capitulo/{id}");
            if (response!.statusCode == 200)
            {
                return response.response!;
            }
            else
            {
                throw new Exception(response.mensaje);
            }
        }


        public async Task<CapituloSh> AddCapitulo(CapituloSh nuevoCapitulo)
        {
            var response = await _httpClient.PostAsJsonAsync("api/Capitulo/add", nuevoCapitulo);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CapituloSh>();
            }
            else
            {
                throw new Exception("Error al agregar el capítulo.");
            }
        }


        public async Task<ResponseApi<bool>> deleteCapitulo(int idCapitulo)
        {
            var result = await _httpClient.DeleteAsync($"api/Capitulo/deleteCap?idCapitulo={idCapitulo}");
            if (result.IsSuccessStatusCode)
            {
                var response = await result.Content.ReadFromJsonAsync<ResponseApi<bool>>();
                return response;
            }
            else
            {
                throw new Exception("Error al eliminar el capítulo.");
            }
        }

        public async Task<CapituloSh> UpdateCapitulo(CapituloSh capitulo) {
            var response = await _httpClient.PutAsJsonAsync($"/api/Capitulo/{capitulo.IdCapitulo}",capitulo);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CapituloSh>();
            }
            else
            {
                throw new Exception("Error al agregar el capítulo.");
            }

        }

    }
}
