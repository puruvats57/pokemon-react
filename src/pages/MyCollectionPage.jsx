import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSavedCollection, updateCollection } from '../utils/localStorageUtils';

export default function MyCollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    setCollection(getSavedCollection());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...collection];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setCollection(reordered);
    updateCollection(reordered);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>
        My Collection
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="collection">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}
                 style={{
                   display: 'flex',
                   flexWrap: 'wrap',
                   justifyContent: 'center',
                   gap: '1.5rem',
                   padding: '1rem',
                 }}>
              {collection.map((p, idx) => (
                <Draggable key={p.id} draggableId={p.id.toString()} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        background: '#fff',
                        color: '#333',
                        borderRadius: '20px',
                        padding: '1rem',
                        width: '250px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      <img src={p.sprites.front_default} alt={p.name} width={80} />
                      <h3>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
