import React from "react"

export default props => {
    if (props.assets) {
      const assets = props.assets.map(asset => {
        return (
          <tr>
            <td>{asset.title}</td>
            <td>
              <a href={asset.url}>{asset.url}</a>
            </td>
          </tr>
        );
      });
      return (
        <div>
          <h2>Project assets</h2>
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>{assets}</tbody>
          </table>
        </div>
      );
    }

    return null;
};