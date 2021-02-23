﻿using Microsoft.AspNetCore.Mvc.RazorPages;
using Minato.Contexts;
using Minato.Models;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Minato.Services
{
    public class DistanceMatrixService : PageModel
    {
        private readonly string Base = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        private readonly IHttpClientFactory _clientFactory;
        private string CepOrigem { get; set; }
        private string Key { get; set; }

        public DistanceMatrixService(Context context, IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            Configuracao conf = context.Configuracao.Find(1);
            Key = conf.KeyDistanceMatrix;
            CepOrigem = conf.CepRestaurante;
        }

        public async Task<string> Get(string cepDestino)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"{Base}origins={CepOrigem}&destinations={cepDestino}&key={Key}");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var body = string.Empty;
                using (var reader = new StreamReader(response.Content.ReadAsStreamAsync().Result))
                {
                    reader.BaseStream.Seek(0, SeekOrigin.Begin);
                    body = reader.ReadToEnd();
                }
                return body;
            }
            else
            {
                return null;
            }
        }
    }
}