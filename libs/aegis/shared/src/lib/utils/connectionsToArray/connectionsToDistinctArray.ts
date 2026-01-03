import { Connection } from '../../types';

export const connectionsToDistinctArray = <T extends { id: string }>(
  connections: Connection<T>[]
) => {
  const map = new Map<string, T>();
  connections.forEach((connection) => {
    connection.nodes?.forEach((node) => {
      map.set(node.id, node);
    });
  });
  return Array.from(map.values());
};
