import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit, 
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Property } from '@/types/property';

// Referência à coleção de imóveis
const propertiesCollection = collection(db, 'properties');

// Obter todos os imóveis
export async function getAllProperties(): Promise<Property[]> {
  try {
    const querySnapshot = await getDocs(propertiesCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return [];
  }
}

// Obter um imóvel pelo ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Property;
    } else {
      console.log('Imóvel não encontrado!');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error);
    return null;
  }
}

// Filtrar imóveis com base em critérios
export async function filterProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  type?: 'venda' | 'aluguel';
  propertyType?: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  status?: string;
}): Promise<Property[]> {
  try {
    let q = query(propertiesCollection);

    // Aplicar filtros
    if (filters.minPrice) {
      q = query(q, where('price', '>=', filters.minPrice));
    }
    
    if (filters.maxPrice) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }
    
    if (filters.bedrooms) {
      q = query(q, where('bedrooms', '>=', filters.bedrooms));
    }
    
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    
    if (filters.propertyType) {
      q = query(q, where('propertyType', '==', filters.propertyType));
    }
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error('Erro ao filtrar imóveis:', error);
    return [];
  }
}

// Adicionar novo imóvel
export async function addProperty(property: Omit<Property, 'id'>, imageFile?: File): Promise<Property | null> {
  try {
    // Se um arquivo de imagem for fornecido, carregue-o para o Firebase Storage
    let imageUrl = property.imageUrl;
    
    if (imageFile) {
      const storageRef = ref(storage, `properties/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Adicionar timestamp do servidor
    const propertyWithTimestamp = {
      ...property,
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(propertiesCollection, propertyWithTimestamp);
    
    return {
      id: docRef.id,
      ...propertyWithTimestamp
    } as unknown as Property;
  } catch (error) {
    console.error('Erro ao adicionar imóvel:', error);
    return null;
  }
}

// Atualizar imóvel existente
export async function updateProperty(
  id: string, 
  updates: Partial<Property>, 
  imageFile?: File
): Promise<Property | null> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.log('Imóvel não encontrado!');
      return null;
    }

    // Se um novo arquivo de imagem for fornecido, carregue-o e atualize a URL
    let imageUrl = updates.imageUrl || docSnap.data().imageUrl;
    
    if (imageFile) {
      // Se houver uma imagem anterior no Storage e ela não for uma URL do Unsplash, exclua-a
      const currentImageUrl = docSnap.data().imageUrl;
      if (currentImageUrl && currentImageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const oldImageRef = ref(storage, currentImageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.log('Erro ao excluir imagem antiga:', error);
        }
      }

      // Carregar a nova imagem
      const storageRef = ref(storage, `properties/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Atualizar o documento com o timestamp
    const updatedProperty = {
      ...updates,
      imageUrl,
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updatedProperty);
    
    return {
      id,
      ...docSnap.data(),
      ...updatedProperty
    } as unknown as Property;
  } catch (error) {
    console.error('Erro ao atualizar imóvel:', error);
    return null;
  }
}

// Remover imóvel
export async function removeProperty(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.log('Imóvel não encontrado!');
      return false;
    }

    // Se a imagem estiver no Firebase Storage, exclua-a
    const imageUrl = docSnap.data().imageUrl;
    if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.log('Erro ao excluir imagem:', error);
      }
    }

    // Excluir o documento
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Erro ao remover imóvel:', error);
    return false;
  }
}

// Buscar imóveis com paginação
export async function getPropertiesPaginated(
  pageSize: number = 10, 
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  properties: Property[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> {
  try {
    let q;
    
    if (lastDoc) {
      q = query(
        propertiesCollection,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    } else {
      q = query(
        propertiesCollection,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const properties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));

    const newLastDoc = querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : null;

    return {
      properties,
      lastDoc: newLastDoc
    };
  } catch (error) {
    console.error('Erro ao buscar imóveis paginados:', error);
    return {
      properties: [],
      lastDoc: null
    };
  }
} 