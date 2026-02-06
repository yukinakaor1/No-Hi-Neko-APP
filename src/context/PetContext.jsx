import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    // 1. The Pet the user chose
    const [selectedPet, setSelectedPet] = useState(null);

    // 2. The bond progress (circle 0–100); cat can choose to bond at any %
    const [bondingLevel, setBondingLevel] = useState(0);
    const [bondTarget, setBondTarget] = useState(100);
    const [readyToName, setReadyToName] = useState(false);
    const [petName, setPetName] = useState(null);
    const [isAdopted, setIsAdopted] = useState(false);

    const incrementBond = () => {
        if (isAdopted) return;
        setBondingLevel(prev => {
            const next = Math.min(100, prev + Math.floor(Math.random() * 14) + 5);
            if (next >= 100) setReadyToName(true); // Guaranteed ready at 100%
            return next;
        });
        // Random chance each pet that the cat bonds early (20%) – might bond at 13%, 30%, etc.
        if (!readyToName && Math.random() < 0.2) setReadyToName(true);
    }

    // --- NEW FUNCTION: Call this when user clicks "Save Name" ---
    const adoptPet = async (name) => {
        // 1. Update Local State immediately so UI reacts
        setPetName(name);
        setIsAdopted(true);

        // 2. Explicitly save to Firebase (We do this here to ensure it saves NOW)
        try {
            await setDoc(doc(db, "pets", "my_pet"), {
                selectedPet,
                bondingLevel,
                bondTarget,
                readyToName: true,
                petName: name,
                isAdopted: true,
                adoptedAt: new Date().toISOString()
            });
            console.log("Adoption successful!");
        } catch (error) {
            console.error("Error adopting pet:", error);
        }
    };

    // Load data from Firebase on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const docRef = doc(db, "pets", "my_pet");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.selectedPet) setSelectedPet(data.selectedPet);
                    if (data.bondingLevel !== undefined) setBondingLevel(data.bondingLevel);
                    if (data.bondTarget !== undefined) setBondTarget(data.bondTarget);
                    if (data.readyToName !== undefined) setReadyToName(data.readyToName);
                    if (data.petName) setPetName(data.petName);
                    if (data.isAdopted) setIsAdopted(data.isAdopted);
                }
            } catch (error) {
                console.error("Error loading pet data:", error);
            }
        };
        loadData();
    }, []);

    // Save data whenever state changes (Auto-save)
    useEffect(() => {
        if (!selectedPet) return;

        const saveData = async () => {
            try {
                await setDoc(doc(db, "pets", "my_pet"), {
                    selectedPet,
                    bondingLevel,
                    bondTarget,
                    readyToName,
                    petName: petName || null,
                    isAdopted
                });
            } catch (error) {
                console.error("Error saving pet data:", error);
            }
        };
        // We debounce this slightly in real apps, but this is fine for now
        saveData();
    }, [selectedPet, bondingLevel, bondTarget, readyToName, petName, isAdopted]);

    const selectThePet = (pet) => {
        setSelectedPet(pet);
        setBondingLevel(0);
        setReadyToName(false);
        setPetName(null);
        setIsAdopted(false);
        setBondTarget(100);
    }

    return (
        <PetContext.Provider value={{
            selectedPet,
            selectThePet,
            bondingLevel,
            incrementBond,
            bondTarget,
            readyToName,
            petName,
            isAdopted,
            adoptPet
        }}>
            {children}
        </PetContext.Provider>
    )
}

export const usePet = () => {
    return useContext(PetContext);
}