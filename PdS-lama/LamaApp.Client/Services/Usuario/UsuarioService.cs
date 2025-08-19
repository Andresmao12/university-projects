using LamaApp.Shared;
using System.Net.Http;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;

namespace LamaApp.Client.Services.Usuario
{
    public class UsuarioService : IUsuarioService
    {

        private readonly HttpClient _httpClient;

        public UsuarioService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<UsuarioSh>> GetUsuarios()
        {
            var result = await _httpClient.GetFromJsonAsync<ResponseApi<List<UsuarioSh>>>("api/Usuario");

            if (result!.statusCode == 200)
            {
                return result.response!;
            }
            else
            {
                throw new Exception(result.mensaje);
            }
        }

        public async Task<UsuarioSh> GetUsuarioById(int id)
        {
            var result = await _httpClient.GetFromJsonAsync<ResponseApi<UsuarioSh>>($"api/Usuario/id/{id}");

            if (result!.statusCode == 200)
            {
                return result.response!;
            }
            else
            {
                throw new Exception(result.mensaje);
            }
        }


        public async Task<UsuarioSh> GetUsuarioByName(string userName)
        {
            var result = await _httpClient.GetFromJsonAsync<ResponseApi<UsuarioSh>>($"api/Usuario/nombre/{userName}");

            if (result!.statusCode == 200)
            {
                return result.response;
            }
            else
            {
                throw new Exception(result.mensaje);
            }
            
        }


        public async Task<ResponseApi<int>> addUsuario(UsuarioSh usuario)
        {
            var result = await _httpClient.PostAsJsonAsync("api/Usuario/add", usuario);
            var response = await result.Content.ReadFromJsonAsync<ResponseApi<int>>();

            return response!;
        }


        public async Task<ResponseApi<bool>> LoginVerif(string nombreUsuario, string plainPassword)
        {
            // Crear el objeto con los parámetros de login
            var loginRequest = new LoginRequest
            {
                NombreUsuario = nombreUsuario,
                PlainPassword = plainPassword
            };

            // Enviar la solicitud POST al servidor
            var result = await _httpClient.PostAsJsonAsync("api/Usuario/login", loginRequest);
            var response = await result.Content.ReadFromJsonAsync<ResponseApi<bool>>();

            return response!;
        }

        public class LoginRequest
        {
            public string NombreUsuario { get; set; } = string.Empty;
            public string PlainPassword { get; set; } = string.Empty;
        }



        public Task<bool> DeleteUsuario(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> editUsuario(UsuarioSh usuario)
        {
            throw new NotImplementedException();
        }




    }

}
