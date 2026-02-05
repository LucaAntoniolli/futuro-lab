namespace futuro_lab.Models
{
    public class Personale
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cognome { get; set; } = string.Empty;
        public string? Societa { get; set; }
        public DateOnly? DataInizio { get; set; }
        public DateOnly? DataFine { get; set; }
    }
}