using Microsoft.EntityFrameworkCore;
using futuro_lab.Models;

namespace futuro_lab.Data
{
    public class FuturoLabContext : DbContext
    {
        public FuturoLabContext(DbContextOptions<FuturoLabContext> options) : base(options)
        {
        }

        public DbSet<Personale> Personale { get; set; }
        public DbSet<AnagraficaRifiuti> AnagraficaRifiuti { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurazione tabella Personale
            modelBuilder.Entity<Personale>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Cognome).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Societa).HasMaxLength(100);
                entity.ToTable("Personale");
            });

            // Configurazione tabella AnagraficaRifiuti
            modelBuilder.Entity<AnagraficaRifiuti>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Tipo).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Descrizione).HasColumnType("nvarchar(max)");
                entity.Property(e => e.LuogoProduzione).HasMaxLength(255);
                entity.Property(e => e.Note).HasColumnType("nvarchar(max)");
                entity.ToTable("AnagraficaRifiuti");
            });
        }
    }
}