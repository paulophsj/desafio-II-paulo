import React, { FormEvent, useState } from "react";
import { findGitHubUser } from "../services/findGitHubUser";
import Image from "next/image";

interface GitHubUserResponse {
  login?: string;
  avatar_url?: string;
  bio?: string;
}
interface errorInterface {
  message?: string;
}

export default function GitHubUser() {
  const [user, setUser] = useState<GitHubUserResponse>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<errorInterface | null>(null);

  const findUser = async (event: FormEvent<HTMLFormElement>) => {
    setUser({});
    setError(null);
    setLoading(true);
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: GitHubUserResponse = Object.fromEntries(form.entries());

    try {
      const github = await findGitHubUser(data.login as string);
      setUser(github);
    } catch (error) {
      setError(error as errorInterface);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div
        id="formArea"
        className="bg-black w-75 h-75 d-flex align-items-center flex-column rounded p-5 gap-5"
      >
        <form onSubmit={findUser} className="w-50 d-flex flex-column gap-5">
          <header className="d-flex align-items-center justify-content-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Github"
              width={75}
              height={75}
              title="Github"
              style={{ filter: "invert(1)" }}
            />
            <p className="text-white m-0 h1">
              Perfil <strong>GitHub</strong>
            </p>
          </header>
          <span className="position-relative d-flex flex-column justify-content-center">
            <input
              type="text"
              placeholder="Digite um usuário do Github"
              name="login"
              className="p-3 rounded border border-none w-100"
            />
            <button
              type="submit"
              className="position-absolute rounded border border-none"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
            </button>
          </span>
        </form>
        {loading && <div className="loader"></div>}
        {error && (
          <div
            className="w-75 h-25 text-center rounded d-flex align-items-center justify-content-center flex-column"
            style={{ backgroundColor: "lightgray", color: "red" }}
          >
            {error.message?.split("{breakLine}").map((line, index) => (
              <p key={index} className="m-0 h4">
                {line}
                <br />
              </p>
            ))}
          </div>
        )}
        {user.avatar_url && (
          <section
            className="w-75 d-flex align-items-center justify-content-center gap-5 p-4 rounded"
            id="user-section"
          >
            <img src={user.avatar_url} alt={user.login} width={200} />
            <aside>
              <h5>{user.login}</h5>
              <p>{user.bio}</p>
            </aside>
          </section>
        )}
      </div>
    </React.Fragment>
  );
}
