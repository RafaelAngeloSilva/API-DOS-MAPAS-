import { useEffect, useState } from 'react';
import api from '../../services/api';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("", {
          params: {
            api_key: "live_NvDh0hvG3Wr0AhnGqtPbMwX05YfWNkGuv7XwXU3oQIY23KuwhQq2xnIP7pjgm0sc"
          }
        });

        // Verifique se `response.data.results` é um array
        if (Array.isArray(response.data.results)) {
          setFilmes(response.data.results.slice(0, 10));
        } else {
          console.error('Os resultados não são um array:', response.data.results);
        }
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      }
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      {/* <h1>Filmes</h1> */}
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <span>{filme.id}</span>
            {/* Verifique se a URL da imagem está definida antes de usar */}
            {filme.poster_path ? (
              <img 
                src={filme.poster_path}
                alt={filme.title || filme.id}
              />
            ) : (
              <span>Imagem não disponível</span>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
