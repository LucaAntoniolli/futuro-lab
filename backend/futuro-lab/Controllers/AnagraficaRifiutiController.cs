using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using futuro_lab.Data;
using futuro_lab.Models;

namespace futuro_lab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnagraficaRifiutiController : ControllerBase
    {
        private readonly FuturoLabContext _context;
        private readonly ILogger<AnagraficaRifiutiController> _logger;

        public AnagraficaRifiutiController(FuturoLabContext context, ILogger<AnagraficaRifiutiController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnagraficaRifiuti>>> GetAnagraficaRifiuti()
        {
            try
            {
                return await _context.AnagraficaRifiuti.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero dell'anagrafica rifiuti");
                return StatusCode(500, new { message = "Errore durante il recupero dei dati" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnagraficaRifiuti>> GetAnagraficaRifiutiById(int id)
        {
            try
            {
                var anagrafica = await _context.AnagraficaRifiuti.FindAsync(id);
                if (anagrafica == null)
                {
                    return NotFound(new { message = $"Anagrafica rifiuti con Id {id} non trovata" });
                }
                return anagrafica;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante il recupero dell'anagrafica rifiuti con Id {id}");
                return StatusCode(500, new { message = "Errore durante il recupero dei dati" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<AnagraficaRifiuti>> CreateAnagraficaRifiuti(AnagraficaRifiuti anagrafica)
        {
            try
            {
                _context.AnagraficaRifiuti.Add(anagrafica);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAnagraficaRifiutiById), new { id = anagrafica.Id }, anagrafica);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la creazione dell'anagrafica rifiuti");
                return StatusCode(500, new { message = "Errore durante la creazione dei dati" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnagraficaRifiuti(int id, AnagraficaRifiuti anagrafica)
        {
            if (id != anagrafica.Id)
            {
                return BadRequest(new { message = "L'Id nel percorso non corrisponde all'Id del corpo della richiesta" });
            }

            _context.Entry(anagrafica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!AnagraficaRifiutiExists(id))
                {
                    return NotFound(new { message = $"Anagrafica rifiuti con Id {id} non trovata" });
                }
                _logger.LogError(ex, $"Errore di concorrenza durante l'aggiornamento dell'anagrafica rifiuti con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'aggiornamento dei dati" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante l'aggiornamento dell'anagrafica rifiuti con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'aggiornamento dei dati" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnagraficaRifiuti(int id)
        {
            try
            {
                var anagrafica = await _context.AnagraficaRifiuti.FindAsync(id);
                if (anagrafica == null)
                {
                    return NotFound(new { message = $"Anagrafica rifiuti con Id {id} non trovata" });
                }

                _context.AnagraficaRifiuti.Remove(anagrafica);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Errore durante l'eliminazione dell'anagrafica rifiuti con Id {id}");
                return StatusCode(500, new { message = "Errore durante l'eliminazione dei dati" });
            }
        }

        private bool AnagraficaRifiutiExists(int id)
        {
            return _context.AnagraficaRifiuti.Any(e => e.Id == id);
        }
    }
}