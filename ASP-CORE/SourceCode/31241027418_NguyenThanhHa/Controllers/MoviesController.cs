using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _31241027418_NguyenThanhHa.Data;
using _31241027418_NguyenThanhHa.Models;

namespace _31241027418_NguyenThanhHa.Controllers;

public class MoviesController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _env;

    public MoviesController(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // GET: Movies (Tìm kiếm + Lọc theo thể loại)
    public async Task<IActionResult> Index(string movieGenre, string searchString)
    {
        if (_context.Movies == null)
        {
            return Problem("Entity set 'ApplicationDbContext.Movies' is null.");
        }

        IQueryable<string> genreQuery = from g in _context.Genres
                                        orderby g.Name
                                        select g.Name;

        var movies = _context.Movies.Include(m => m.GenreObj).AsQueryable();

        if (!string.IsNullOrEmpty(searchString))
        {
            movies = movies.Where(s => s.Title!.ToUpper().Contains(searchString.ToUpper()));
        }

        if (!string.IsNullOrEmpty(movieGenre))
        {
            movies = movies.Where(x => x.GenreObj.Name == movieGenre);
        }

        var movieGenreVM = new MovieGenreViewModel
        {
            Genres = new SelectList(await genreQuery.Distinct().ToListAsync()),
            Movies = await movies.ToListAsync(),
            MovieGenre = movieGenre,
            SearchString = searchString
        };

        return View(movieGenreVM);
    }

    // GET: Movies/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null) return NotFound();

        var movie = await _context.Movies
            .Include(m => m.GenreObj)
            .FirstOrDefaultAsync(m => m.ID == id);
        if (movie == null) return NotFound();

        return View(movie);
    }

    // GET: Movies/Create
    [Authorize]
    public IActionResult Create()
    {
        ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name");
        return View();
    }

    // POST: Movies/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize]
    public async Task<IActionResult> Create([Bind("ID,Title,Summary,ReleaseDate,Genre,GenreID,Price,Rated,PicturePath,PictureUpload")] Movie movie)
    {
        if (movie.GenreID.HasValue)
        {
            var g = await _context.Genres.FindAsync(movie.GenreID.Value);
            if (g != null) movie.Genre = g.ID.ToString();
        }
        ModelState.Remove("Genre");

        if (ModelState.IsValid)
        {
            if (movie.PictureUpload != null && movie.PictureUpload.Length > 0)
            {
                string uploadsFolder = Path.Combine(_env.WebRootPath, "images");
                if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(movie.PictureUpload.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await movie.PictureUpload.CopyToAsync(fileStream);
                }
                movie.PicturePath = "/images/" + uniqueFileName;
            }

            _context.Add(movie);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name", movie.GenreID);
        return View(movie);
    }

    // GET: Movies/Edit/5
    [Authorize]
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null) return NotFound();

        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return NotFound();

        ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name", movie.GenreID);
        return View(movie);
    }

    // POST: Movies/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize]
    public async Task<IActionResult> Edit(int id, [Bind("ID,Title,Summary,ReleaseDate,Genre,GenreID,Price,Rated,PicturePath,PictureUpload")] Movie movie)
    {
        if (id != movie.ID) return NotFound();

        if (movie.GenreID.HasValue)
        {
            var g = await _context.Genres.FindAsync(movie.GenreID.Value);
            if (g != null) movie.Genre = g.ID.ToString();
        }
        ModelState.Remove("Genre");

        if (ModelState.IsValid)
        {
            try
            {
                if (movie.PictureUpload != null && movie.PictureUpload.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_env.WebRootPath, "images");
                    if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(movie.PictureUpload.FileName);
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await movie.PictureUpload.CopyToAsync(fileStream);
                    }
                    movie.PicturePath = "/images/" + uniqueFileName;
                }

                _context.Update(movie);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(movie.ID)) return NotFound();
                else throw;
            }
            return RedirectToAction(nameof(Index));
        }
        ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name", movie.GenreID);
        return View(movie);
    }

    // GET: Movies/Delete/5
    [Authorize]
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null) return NotFound();

        var movie = await _context.Movies
            .Include(m => m.GenreObj)
            .FirstOrDefaultAsync(m => m.ID == id);
        if (movie == null) return NotFound();

        return View(movie);
    }

    // POST: Movies/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    [Authorize]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie != null) _context.Movies.Remove(movie);

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool MovieExists(int id)
    {
        return _context.Movies.Any(e => e.ID == id);
    }
}