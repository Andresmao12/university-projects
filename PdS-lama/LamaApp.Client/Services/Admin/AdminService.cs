using LamaApp.Shared;
using System.Net.Http;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;

namespace LamaApp.Client.Services.Admin
{
    public class AdminService : IAdminService
    {

        private readonly HttpClient _httpClient;

        public AdminService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }



        public async Task<Estadisticas> getStats()
        {
            var estadisticas = new Estadisticas();

            try
            {
                var response = await _httpClient.GetFromJsonAsync<ResponseApi<Estadisticas>>("api/admin/getStats");
                if (response != null && response.statusCode == 200)
                {
                    estadisticas = response.response;
                }
                else
                {
                    // Manejar error
                    Console.WriteLine($"Error: {response?.mensaje}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Excepción: {ex.Message}");
            }


            return estadisticas;

        }



        public async Task<ResponseApi<bool>> deleteCapitulo(int idCapitulo)
        {

            var responseApi = new ResponseApi<bool>();

            try
            {
                var response = await _httpClient.DeleteAsync($"api/capitulo/{idCapitulo}");


                if (response.IsSuccessStatusCode)
                {
                    responseApi.statusCode = 200;
                    responseApi.response = true;
                    responseApi.mensaje = "Capítulo eliminado correctamente.";
                }
                else
                {
                    responseApi.statusCode = (int)response.StatusCode;
                    responseApi.response = false;
                    responseApi.mensaje = await response.Content.ReadAsStringAsync();
                }


            }
            catch (Exception ex)
            {
                responseApi.statusCode = 400;
                responseApi.response = false;
                responseApi.mensaje = ex.Message;
            }

            return responseApi;

        }
        

    }

}
