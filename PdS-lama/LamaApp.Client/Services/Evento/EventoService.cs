using LamaApp.Shared;
using System.Net.Http.Json;

namespace LamaApp.Client.Services.Evento
{
    public class EventoService : IEventoService
    {
        private readonly HttpClient _httpClient;

        public EventoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<EventoSh>> GetEventos() {
            var response = await _httpClient.GetFromJsonAsync<ResponseApi<List<EventoSh>>>("api/Evento");

            if (response!.statusCode == 200)
            {
                return response.response!;
            }
            else
            {
                throw new Exception(response.mensaje);
            }
        }

        public async Task<EventoSh> AddEvento(EventoSh evento) {
            var response = await _httpClient.PostAsJsonAsync("api/Evento", evento);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<EventoSh>();
            }
            else
            {
                throw new Exception("Error al agregar el capítulo.");
            }
        }

        public async Task<ResponseApi<bool>> deleteEvento(int idEvento)
        {
            var result = await _httpClient.DeleteAsync($"api/Evento/delete?idEvento={idEvento}");
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

        public async Task<EventoSh> UpdateEvento(EventoSh evento)
        {
            var response = await _httpClient.PutAsJsonAsync($"/api/Evento/{evento.IdEvento}", evento);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<EventoSh>();
            }
            else
            {
                throw new Exception("Error al agregar el capítulo.");
            }

        }
    }
}
