namespace futuro_lab.Models
{
    public class AnagraficaRifiuti
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string? Descrizione { get; set; }
        public string? LuogoProduzione { get; set; }
        public DateOnly? DataProduzione { get; set; }
        public string? Note { get; set; }
    }
}