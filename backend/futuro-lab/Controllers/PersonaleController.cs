using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using futuro_lab.Data;
using futuro_lab.Models;

namespace futuro_lab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonaleController : ControllerBase
    {
        private readonly FuturoLabContext _context;
        private readonly ILogger<PersonaleController> _logger;

        public PersonaleController(FuturoLabContext context, ILogger<PersonaleController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personale>>> GetPersonale()
        {
            try
            {
                return await _context.Personale.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero del personale");
                return StatusCode(500, new { message = "Errore durante il recupero dei dati" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Personale>> GetPersonaleById(int id)
        {
            try
            {
                var personale = await _context.Personale.FindAsync(id);
                if (personale == null)
                {
                    return NotFound(new { message = $"Personale con Id {id} non trovato" });
                }
                return personale;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante il recupero del personale con Id {id}");
                return StatusCode(500, new { message = "Errore durante il recupero dei dati" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Personale>> CreatePersonale(Personale personale)
        {
            try
            {
                _context.Personale.Add(personale);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPersonaleById), new { id = personale.Id }, personale);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la creazione del personale");
                return StatusCode(500, new { message = "Errore durante la creazione dei dati" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePersonale(int id, Personale personale)
        {
            if (id != personale.Id)
            {
                return BadRequest(new { message = "L'Id nel percorso non corrisponde all'Id del corpo della richiesta" });
            }

            _context.Entry(personale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!PersonaleExists(id))
                {
                    return NotFound(new { message = $"Personale con Id {id} non trovato" });
                }
                _logger.LogError(ex, $"Errore di concorrenza durante l'aggiornamento del personale con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'aggiornamento dei dati" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante l'aggiornamento del personale con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'aggiornamento dei dati" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonale(int id)
        {
            try
            {
                var personale = await _context.Personale.FindAsync(id);
                if (personale == null)
                {
                    return NotFound(new { message = $"Personale con Id {id} non trovato" });
                }

                _context.Personale.Remove(personale);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante l'eliminazione del personale con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'eliminazione dei dati" });
            }
        }

        private bool PersonaleExists(int id)
        {
            return _context.Personale.Any(e => e.Id == id);
        }
    }
}