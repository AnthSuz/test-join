import { Block } from "@material-ui/icons";
import { Tooltip } from "../../Tooltip/Tooltip";
import "./drawer-update-user.css";

export const DrawerUpdateUser = ({
  user,
  updateUserColor,
  updateUserGlobalBadge,
}) => {
  const colors = [
    {
      name: "Bleu",
      color: "blue",
    },
    {
      name: "Chartreuse",
      color: "chartreuse",
    },
    {
      name: "Rouge",
      color: "red",
    },
    {
      name: "Violet",
      color: "purple",
    },
    {
      name: "Orange",
      color: "orange",
    },
    {
      name: "Rose",
      color: "pink",
    },
    {
      name: "Gris",
      color: "grey",
    },
  ];

  return (
    <div className="Drawer-Update-User">
      <div className="User-Style">
        <p className="Drawer-Update-User-Title">Aperçu de l'identité</p>
        <p className="Drawer-Update-User-Body">
          Comment votre apparaîtra dans le chat de la chaîne de Join :
        </p>
        <div className="User-Style-Username">
          {user.prime.enabled && user.prime.display && (
            <img
              src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"
              alt="prime"
              className="Badge"
            />
          )}
          <p style={{ color: user.color, fontWeight: 600 }}>{user.username}</p>
        </div>
      </div>
      <div className="Global-Badge">
        <p className="Drawer-Update-User-Title">Badge Global</p>
        <p className="Drawer-Update-User-Body">
          Ce badge apparaît sur toutes les chaînes et dans les chuchotements.
        </p>
        {user.prime.enabled && (
          <img
          onClick={() => updateUserGlobalBadge(true)}
            src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"
            alt="prime"
            className={
              user.prime.display ? "Badge-Selected" : "Badge"
            }
          />
        )}
        <Block
          onClick={() => updateUserGlobalBadge(false)}
          className={user.prime.display ? "Badge Block" : "Badge-Selected"}
        />
      </div>
      <div>
        <div className="User-Color">
          <p className="Drawer-Update-User-Title">Couleur global du nom</p>
          <p className="Drawer-Update-User-Body">
            Choisissez une couleur, n'importe laquelle ! Le changement de
            couleur peut prendre quelques minutes avant d'apparaître dans
            l'espace de discussion.
          </p>
          <div className="Color-List">
            {colors.map((color, index) => {
              return (
                <div key={`${color}-${index}`}>
                  <Tooltip text={color.name}>
                    <div
                      className="Color"
                      style={{ backgroundColor: color.color }}
                      onClick={() => updateUserColor(color.color)}
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
