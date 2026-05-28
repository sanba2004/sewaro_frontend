
import React, { useState, useEffect } from 'react';import { supabase } from "../supabaseClient";

import '/src/styles/ShipmentStepper.css';
import '/src/styles/Invoice.css';
import axios from 'axios';
import ErrorModal from './Error';

// 🗺️ Go up one level to exit 'components', then down into 'views' to find ShippingLabel
import ShippingLabel from '../views/ShippingLabel';

export const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", 
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", 
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", 
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
  "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", 
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", 
  "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", 
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", 
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", 
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", 
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const ShipmentStepper = ({userId}) => {
  const [step, setStep] = useState(1);
  const [hasHollow, setHasHollow] = useState(null); // null, 'yes', or 'no'
  const [cbmResult, setCbmResult] = useState(0);
  const [dimensions, setDimensions] = useState({ l: 0, w: 0, h: 0 });
  const [loading, setLoading] = useState(false);
  // Updated to exactly 3 steps
  const [idFiles, setIdFiles] = useState({ front: null, back: null });
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [pricingTiers, setPricingTiers] = useState([]);

  const [validationError, setValidationError] = useState('');// Tracks error message content
  // const handleProceedToStepTwo = (e) => {
  //   e.preventDefault(); // Stop alternative anchor behaviors
    
  //   // 1. Gather values
  //   const senderType = senderInfo.senderType || '';
  //   const fullName = (senderInfo.fullName || '').trim();
  //   const contactNum = (senderInfo.contactNum || '').trim();
  //   const country = senderInfo.country || '';
  //   const zip = (senderInfo.zip || '').trim();
  //   const state = (senderInfo.state || '').trim();
  //   const city = (senderInfo.city || '').trim();
  //   const address = (senderInfo.address || '').trim();

  //   // 2. Strict Empty Fields Rule Check
  //   if (!senderType || !fullName || !contactNum || !country || !zip || !state || !city || !address) {
  //     setValidationError('Please complete all required fields before proceeding to the next section.');
  //     return;
  //   }

  //   // 3. Contact Number Regex Rule Verification (Must be exactly 10 digits)
  //   const digitRegex = /^\d{10}$/;
  //   if (!digitRegex.test(contactNum)) {
  //     setValidationError('The contact number must be exactly 10 numerical digits long.');
  //     return;
  //   }

  //   // Clear validation state and progress forward safely
  //   setValidationError('');
  //   setStep(2);
  // };
  const handleNextNavigation = (e) => {
  if (e) e.preventDefault();

  // ==========================================
  // 📍 STEP 1 VALIDATION (Sender Details)
  // ==========================================
  if (step === 1) {
    const senderType = senderInfo.senderType || '';
    const fullName = (senderInfo.fullName || '').trim();
    const contactNum = (senderInfo.contactNum || '').trim();
    const country = senderInfo.country || '';
    //const zip = (senderInfo.zip || '').trim();
    //const state = (senderInfo.state || '').trim();
    const city = (senderInfo.city || '').trim();
    const address = (senderInfo.address || '').trim();

    // Track empty fields individually
    const emptyFields = [];
    if (!senderType) emptyFields.push("Sender Type");
    if (!fullName) emptyFields.push("Full Name");
    if (!contactNum) emptyFields.push("Contact Number");
    if (!country) emptyFields.push("Country");
   // if (!zip) emptyFields.push("Zip Code");
    //if (!state) emptyFields.push("State");
    if (!city) emptyFields.push("City");
    if (!address) emptyFields.push("Full Address");

    // Show explicit warning message listing the empty fields
    if (emptyFields.length > 0) {
      setValidationError(`The following field(s) cannot be left empty: ${emptyFields.join(', ')}.`);
      return;
    }

    // Phone format check (only runs if the field isn't empty)
    const digitRegex = /^\d{10}$/;
    if (!digitRegex.test(contactNum)) {
      setValidationError('The Contact Number must be exactly 10 numerical digits.');
      return;
    }

    setValidationError('');
    setStep(2);
  }

  // ==========================================
  // 📍 STEP 2 VALIDATION (Receiver Details)
  // ==========================================
  else if (step === 2) {
  const recName = (receiverInfo.fullName || '').trim();
  //const idType = receiverInfo.idType || '';
  
  // 🛡️ CHANGED: Checks for an already saved cloud link OR a browser cached file
 // const hasIdAttachment = !!receiverInfo.receiverIdUrl || !!stagedFiles.receiverFile;
  
  const recContact = (receiverInfo.contactNumber || '').trim();
  const recCountry = receiverInfo.country || '';
  //const recState = (receiverInfo.state || '').trim();
  //const recZip = (receiverInfo.zip || '').trim(); // Target DB 'zip' key
  const recCity = (receiverInfo.city || '').trim();
  const recLandmark = (receiverInfo.landmark || '').trim();
  const recAddress = (receiverInfo.fullAddress || '').trim();

  // Track exactly what is empty based on mandatory indicators
  const emptyFields = [];
  if (!recName) emptyFields.push("Receiver's Full Name");
  //if (!idType) emptyFields.push("Verification ID Type");
  //if (!hasIdAttachment) emptyFields.push("Receiver ID Document Attachment"); // Tracks staged or uploaded
  if (!recContact) emptyFields.push("Contact Number");
  if (!recCountry) emptyFields.push("Country");
  //if (!recState) emptyFields.push("State");
  //if (!recZip) emptyFields.push("Zip Code");
  if (!recCity) emptyFields.push("City");
  if (!recLandmark) emptyFields.push("Area / Landmark");
  if (!recAddress) emptyFields.push("Full Address");

  if (emptyFields.length > 0) {
    setValidationError(`The following field(s) cannot be left empty: ${emptyFields.join(', ')}.`);
    return;
  }

  setValidationError('');
  setStep(3);
}

  // ==========================================
  // 📍 STEP 3 VALIDATION (Packages Check)
  // ==========================================
  else if (step === 3) {
    if (!packages || packages.length === 0) {
      setValidationError('Please configure at least one package card layout.');
      return;
    }

    // Loop through each package card and evaluate mandatory fields
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i];
      const profile = (pkg.profile || '').trim();
      const type = (pkg.type || '').trim();
      
      const totalWeightStr = pkg.total_weight !== undefined && pkg.total_weight !== null ? String(pkg.total_weight).trim() : '';
      const totalWeightNum = parseFloat(totalWeightStr);

      const emptyFields = [];
      if (!profile) emptyFields.push("Package Profile");
      if (!type) emptyFields.push("Package Type");
      if (!totalWeightStr || isNaN(totalWeightNum) || totalWeightNum <= 0) {
        emptyFields.push("Total Weight");
      }

      if (emptyFields.length > 0) {
        setValidationError(`Package #${i + 1} has incomplete fields. The following field(s) are empty or invalid: ${emptyFields.join(', ')}.`);
        return;
      }
    }

    setValidationError('');
    setStep(4);
  }

  // ==========================================
  // 📍 STEP 4 VALIDATION
  // ==========================================
  else if (step === 4) {
    setValidationError('');
    setStep(5);
  }
};
  
  const steps = [
    { id: 1, label: "Sender's Information" },
    { id: 2, label: "Receiver's Information" },
    { id: 3, label: "Package Information" },
    { id: 4, label: "Billing & Delivery" },
    { id: 5, label: "Final Invoice" }
  ];
  // 1. Initialize state with one empty item row
  const [items, setItems] = useState([
    { id: Date.now(), description: '', qty: '', weight: '', price: '', hsCode: '' }
  ]);

  // 2. Function to add a new row
  const addItemRow = () => {
    setItems([...items, { id: Date.now(), description: '', qty: '', weight: '', price: '', hsCode: '' }]);
  };

  // 3. Function to remove a specific row
  const removeItem = (pkgId, itemId) => {
    setPackages(packages.map(pkg => {
      if (pkg.id === pkgId) {
        const newItems = pkg.items.filter(item => item.id !== itemId);
        return { ...pkg, items: newItems.length > 0 ? newItems : [{ id: Date.now(), description: '', weight: 0, qty: 1, price: 0, hsCode: '' }] };
      }
      return pkg;
    }));
  };

  //caching of all data in entry field 
  const getSafeCache = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== "undefined") return JSON.parse(saved);
    } catch (err) {
      console.error("Cache error:", err);
    }
    return fallback;
  };

  // Step 1: Sender
  const [senderInfo, setSenderInfo] = useState(() => 
    getSafeCache('shp_sender', { fullName: '', senderType: '', contactNum: '',country: '',state: '',zip: '', idFrontUrl: '',idBackUrl: '', city: '', address: '',  idType: '', tId:'', zip:'', state:'' })
  );

  // Step 2: Receiver
  const [receiverInfo, setReceiverInfo] = useState(() => 
    getSafeCache('shp_receiver', { fullName: '',state: '',zip: '',landmark: '', contactNumber: '', country: 'Nepal', city: '', fullAddress: '', receiverIdUrl:'' })
  );

  const [billingInfo, setBillingInfo] = useState(() => 
  getSafeCache('shp_billing', { 
    method: 'Cash',   // e.g., Cash, Bank Transfer, Cheque
    currency: 'NPR', 
    subtotal: '0', 
    tax: '0', 
    total: '0',
    paymentStatus: 'Unpaid' 
  })
);


  // Step 3: Packages
  const [packages, setPackages] = useState(() => 
    getSafeCache('shp_packages', [
      {
        id: Date.now(),
        profile: '',
        type: '',
        doorToDoor: false, // Default value
        items: [{ id: Date.now() + 1, description: '', weight: 0, qty: 1, price: 0, hsCode: '' }]
      }
    ])
  );

  // For Sender Info
  const updateSender = (field, value) => {
    const updated = { ...senderInfo, [field]: value };
    setSenderInfo(updated);
    localStorage.setItem('shp_sender', JSON.stringify(updated));
  };

  // For Receiver Info
  const updateReceiver = (field, value) => {
    const updated = { ...receiverInfo, [field]: value };
    setReceiverInfo(updated);
    localStorage.setItem('shp_receiver', JSON.stringify(updated));
  };

  // For Packages (Step 3 & 4)
  const savePackagesToCache = (newPackages) => {
    setPackages(newPackages);
    localStorage.setItem('shp_packages', JSON.stringify(newPackages));
  };



  //receiver caching 
  const handleReceiverUpdate = (field, value) => {
    // 1. Update the UI state
    const updatedData = { ...receiverInfo, [field]: value };
    setReceiverInfo(updatedData);

    // 2. Save to Browser Storage
    localStorage.setItem('shp_receiver', JSON.stringify(updatedData));
  };

  const toggleDoorToDoor = (pkgId, isChecked) => {
    // 1. Map through packages to find the right one and update the boolean
    const updatedPackages = packages.map(pkg => 
      pkg.id === pkgId ? { ...pkg, doorToDoor: isChecked } : pkg
    );

    // 2. Update the UI
    setPackages(updatedPackages);

    // 3. Save the entire array to localStorage
    localStorage.setItem('shp_packages', JSON.stringify(updatedPackages));
  };

const calculateGrandTotal = () => {
  // Logic to sum up package weights/prices
  const total = packages.reduce((sum, pkg) => sum + (parseFloat(pkg.weight) || 0), 0);
  return String(total); // Keep it as a string for your VARCHAR column
};




// Add this near your other state hooks at the top of your component file
const [previewTrackingId, setPreviewTrackingId] = useState(() => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `NSC-${dateStr}-${randomSuffix}`;
});








  const addItemToPackage = (pkgId) => {
    setPackages(packages.map(pkg => 
      pkg.id === pkgId 
      ? { ...pkg, items: [...pkg.items, { id: Date.now(), description: '', weight: 0, qty: 1, price: 0, hsCode: '' }] }
      : pkg
    ));
  };
  // Initial state helper
  const initialSenderData = {
    senderType: '',
    fullName: '',
    contactName: '',
    idType: '',
    tin: '',
    location: '',
    country: 'Nepal',
    zipCode: '',
    state: '',
    city: '',
    address: ''
  };



  // // Calculate Total Weight for a specific package
  // const calculateTotalWeight = (pkgItems) => {
  //   return pkgItems.reduce((sum, item) => sum + (item.weight * item.qty), 0).toFixed(2);
  // };
  const calculateTotalWeight = (pkgItems = []) => {
    const total = pkgItems.reduce((sum, item) => {
      const q = parseFloat(item.qty) || 0;
      const w = parseFloat(item.weight) || 0;
      return sum + (q * w);
    }, 0);
    return parseFloat(total.toFixed(2)); // Returns a clean number type
  };

  

  // Add a brand new independent package
  const addPackage = () => {
    setPackages([...packages, {
      id: Date.now(),
      profile: '',
      type: '',
      hasHollow: 'no', // Default to 'no' instead of null
      dims: { l: 0, w: 0, h: 0 },
      cbm: 0,
      items: [{ id: Date.now(), desc: '', weight: 0, qty: 1, price: 0 }]
    }]);
  };
 
  const updatePackageDims = (pkgId, dimension, value) => {
  setPackages(prevPackages => prevPackages.map(pkg => {
    if (pkg.id === pkgId) {
      return {
        ...pkg,
        dims: {
          ...pkg.dims,
          [dimension]: value === '' ? 0 : parseFloat(value)
        }
      };
    }
    return pkg;
  }));
};
  const updatePackageField = (pkgId, field, value) => {
      setPackages(packages.map(p => p.id === pkgId ? { ...p, [field]: value } : p));
    };

  const removePackage = (pkgId) => {
      if (packages.length > 1) {
        setPackages(packages.filter(p => p.id !== pkgId));
      }
    };

  // Calculate CBM for a specific package
  const calculateCBM = (pkgId) => {
  setPackages(packages.map(p => {
    if (p.id === pkgId) {
      // Use optional chaining and fallback to 0 to prevent crashes
      const l = parseFloat(p.dims?.l || 0);
      const w = parseFloat(p.dims?.w || 0);
      const h = parseFloat(p.dims?.h || 0);
      
      const volume = (l * w * h) / 1000000;
      return { ...p, cbm: volume };
    }
    return p;
  }));
};

  // Update an item inside a specific package
  const updateItem = (pkgId, itemId, field, value) => {
    // const cleanValue = (field === 'description' || field === 'hsCode') ? value : Math.max(0, value);
    // setPackages(packages.map(pkg => {
    //   if (pkg.id === pkgId) {
    //     return {
    //       ...pkg,
    //       items: pkg.items.map(item => item.id === itemId ? { ...item, [field]: cleanValue } : item)
    //     };
    //   }
    //   return pkg;
    // }));
    const newPackages = packages.map(pkg => {
    if (pkg.id === pkgId) {
      return {
        ...pkg,
        items: pkg.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
      };
    }
    return pkg;
  });
  savePackagesToCache(newPackages);
  };



  const calculatePackageCost = (pkg) => {
    const actualWeight = parseFloat(calculateTotalWeight(pkg.items));
    const chargeableWeight = getChargeableWeight(actualWeight);
    const rate = getPricePerKg(chargeableWeight);
    let total = chargeableWeight * rate;
    
    if (pkg.doorToDoor) total += 500; // Example flat fee for Door to Door
    return total;
  };
  



  const getChargeableWeight = (weight) => {
    const w = parseFloat(weight);
    if (w <= 0.5) return 0.5;
    if (w <= 1.0) return 1.0;
    return Math.ceil(w); // Rounds up to nearest KG for weights > 1
  };

  // const getPricePerKg = (totalWeight) => {
  //   const w = parseFloat(totalWeight);
  //   if (w >= 10 && w < 20) return 545;
  //   if (w >= 20 && w < 50) return 500;
  //   if (w >= 50 && w < 100) return 478;
  //   if (w >= 100) return 445;
  //   return 600; // Default for small weights
  // };
useEffect(() => {
  const fetchRates = async () => {
    try {
      const response = await axios.get('https://sewaro-backend.onrender.com/api/pricing');
      setPricingTiers(response.data);
    } catch (err) {
      console.error("Error loading live pricing matrix parameters:", err);
    }
  };
  fetchRates();
}, []);

// 🔄 THE DYNAMIC ENGINE: Replaces your old hardcoded logic completely!
// 🔄 THE DYNAMIC ENGINE: Safely evaluates user weight against your database tiers
// 🔄 THE PURE DATABASE ENGINE: No local values or hardcoded rules!
const getPricePerKg = (totalWeight) => {
  const w = parseFloat(totalWeight) || 0;

  // 1. If pricing data has successfully loaded from the database
  if (pricingTiers && pricingTiers.length > 0) {
    
    // Search rows dynamically: checks if the weight is between the min and max columns
    const matchedTier = pricingTiers.find(tier => 
      w >= parseFloat(tier.min_weight) && w <= parseFloat(tier.max_weight)
    );

    // If an exact range match is found, return its custom database rate
    if (matchedTier) {
      return parseFloat(matchedTier.rate_per_kg);
    }

    // Safety Fallback: If weight exceeds the highest range found in the database, 
    // fall back to the rate of the very last tier row (e.g., the 100-500kg tier rate).
    return parseFloat(pricingTiers[pricingTiers.length - 1].rate_per_kg);
  }

  // 2. Loading State Fallback
  // Returns 0 or a base loading identifier while the asynchronous useEffect API call completes
  return 0; 
};
// const uploadToSupabase = async (side) => {
//   // Select the correct file based on the 'side' passed ('front' or 'back')
//   const file = side === 'front' ? stagedFiles.frontFile : stagedFiles.backFile;
  
//   if (!file) return alert("Please select a file first!");

//   const fileName = `${Date.now()}-${side}.${file.name.split('.').pop()}`;
//   const folderPath = side === 'front' ? 'sender-ids' : 'receiver-ids';
//   try {
//     const { data, error } = await supabase.storage
//       .from('documents')
//       .upload(`sender-ids/${fileName}`, file);

//     if (error) throw error;

//     const { data: { publicUrl } } = supabase.storage
//       .from('documents')
//       .getPublicUrl(`sender-ids/${fileName}`);

//     setSenderInfo(prev => ({
//       ...prev,
//       [side === 'front' ? 'idFrontUrl' : 'idBackUrl']: publicUrl
//     }));
    
//     alert(`${side.toUpperCase()} upload successful!`);
//   } catch (err) {
//     alert("Upload failed: " + err.message);
//   }
// };
const uploadToSupabase = async (side) => {
  // Select 'frontFile' or 'receiverFile' depending on which step calls it
  const file = side === 'front' ? stagedFiles.frontFile : stagedFiles.receiverFile;
  
  if (!file) return alert("Please select a file first!");

  // Keep 'front' naming for sender, and use 'receiver' for side parameters
  const fileName = `${Date.now()}-${side}.${file.name.split('.').pop()}`;
  
  // 🌟 Clean folder routing: Front uploads stay in 'sender-ids/', receiver uploads go to 'receiver-ids/'
  const folderPath = side === 'front' ? 'sender-ids' : 'receiver-ids';
  
  try {
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${folderPath}/${fileName}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(`${folderPath}/${fileName}`);

    // 🌟 Conditional State Mapping: Left 'front' exactly as it was, updated 'receiver' cache rules
    if (side === 'front') {
      setSenderInfo(prev => ({
        ...prev,
        idFrontUrl: publicUrl
      }));
    } else {
      setReceiverInfo(prev => ({
        ...prev,
        receiverIdUrl: publicUrl
      }));
      // Manually push to storage to guarantee state caching across screens
      const savedReceiver = JSON.parse(localStorage.getItem('shp_receiver') || '{}');
      savedReceiver.receiverIdUrl = publicUrl;
      localStorage.setItem('shp_receiver', JSON.stringify(savedReceiver));
    }
    
    alert(`${side.toUpperCase()} upload successful!`);
  } catch (err) {
    alert("Upload failed: " + err.message);
  }
};

// This stays in memory only (not in localStorage)
const [stagedFiles, setStagedFiles] = useState({
  frontFile: null,
  frontPreview: '',
  receiverFile: null,
  receiverPreview: ''
});

const handleFileSelect = (e, side) => {
  const file = e.target.files[0];
  if (!file) return;

  // Create a temporary URL for the preview
  const previewUrl = URL.createObjectURL(file);

  setStagedFiles(prev => ({
    ...prev,
    [side === 'front' ? 'frontFile' : 'receiverFile']: file,
    [side === 'front' ? 'frontPreview' : 'receiverPreview']: previewUrl
  }));
};
const clearImage = (side) => {
  setStagedFiles(prev => ({
    ...prev,
    [side === 'front' ? 'frontFile' : 'receiverFile']: null,
    [side === 'front' ? 'frontPreview' : 'receiverPreview']: ''
  }));
  
  // Also clear the permanent URL in senderInfo if it was already uploaded
  setSenderInfo(prev => ({
    ...prev,
    [side === 'front' ? 'idFrontUrl' : 'idBackUrl']: ''
  }));
};
// const confirmShipment = async () => {
//   setLoading(true);

//   try {
//     let finalFrontUrl = senderInfo.idFrontUrl;
//     let finalBackUrl = senderInfo.idBackUrl;

//     // 1. AUTO-UPLOAD: If there are staged files that haven't been uploaded yet
//     if (stagedFiles.frontFile) {
//       const fileName = `${Date.now()}-front.${stagedFiles.frontFile.name.split('.').pop()}`;
//       const { data, error } = await supabase.storage.from('documents').upload(`sender-ids/${fileName}`, stagedFiles.frontFile);
//       if (error) throw new Error("Front ID upload failed");
//       const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`sender-ids/${fileName}`);
//       finalFrontUrl = publicUrl;
//     }

//     if (stagedFiles.backFile) {
//       const fileName = `${Date.now()}-back.${stagedFiles.backFile.name.split('.').pop()}`;
//       const { data, error } = await supabase.storage.from('documents').upload(`sender-ids/${fileName}`, stagedFiles.backFile);
//       if (error) throw new Error("Back ID upload failed");
//       const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`sender-ids/${fileName}`);
//       finalBackUrl = publicUrl;
//     }
//     // 2. Prepare the payload
//     // We don't need "realFrontUrl" variables anymore because 
//     // senderInfo.idFrontUrl IS the real Supabase URL now.
//     const payload = {
//       userId:Number(userId),
//       shipment: {
//         trackingId: String(shipmentId || ""),
//         senderType: String(senderInfo.senderType || ""),
//         senderName: String(senderInfo.fullName || ""),
//         senderCity: String(senderInfo.city || ""),
//         senderIdType: String(senderInfo.idType || ""),
//         senderAddress: String(senderInfo.address || ""),
//         senderContact: String(senderInfo.contactNum || ""),
//         senderCountry: String(senderInfo.country || ""),
//         senderState: String(senderInfo.state || ""),
//         senderZip: String(senderInfo.zipcode || ""),
        
//         // These now pull directly from your state where the Tick button saved them
//         senderIdFront: String(senderInfo.idFrontUrl || ""), 
//         senderIdBack: String(senderInfo.idBackUrl || ""),
        
//         billingMethod: String(billingInfo.method || ""),
//         billingSubtotal: String(billingInfo.subtotal || "0"),
//         billingTotal: String(billingInfo.total || "0"),

//         receiverName: String(receiverInfo.fullName || ""),
//         receiverContact: String(receiverInfo.contactNumber || ""),
//         receiverCountry: String(receiverInfo.country || ""),
//         receiverCity: String(receiverInfo.city || ""),
//         receiverAddress: String(receiverInfo.fullAddress || ""),
//         receiverState: String(receiverInfo.state || ""),
//         receiverZip: String(receiverInfo.zipcode || ""),
//         receiverLandmark: String(receiverInfo.landmark || ""),

//         weight: String(calculateGrandTotal() || "0"),
//         date: String(new Date().toISOString()),
//       },
//       packages: packages.map((pkg) => ({
//         packageId: String(pkg.id || Date.now()),
//         profile: String(pkg.profile || ""),
//         type: String(pkg.type || "Box"),
//         hasHollow: String(pkg.hasHollow || "No"),
//         dims: String(`${pkg.dims?.l || 0}x${pkg.dims?.w || 0}x${pkg.dims?.h || 0}`),
//         cbm: String(pkg.cbm || "0"),
//         items: pkg.items.map((item) => ({
//           desc: String(item.description || ""),
//           weight: String(item.weight || "0"),
//           qty: String(item.qty || "1"),
//           price: String(item.price || "0"),
//           hsCode: String(item.hsCode || ""),
//         })),
//       })),
//     };

//     // 3. Network Request to your MySQL Backend
//     const response = await fetch('http://localhost:5000/api/shipments/confirm', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       alert(`Success! ${result.message || "Shipment Saved"}`);
      
//       // Cleanup: Revoke temp preview URLs to free up browser memory
//       if (stagedFiles.frontPreview) URL.revokeObjectURL(stagedFiles.frontPreview);
//       if (stagedFiles.backPreview) URL.revokeObjectURL(stagedFiles.backPreview);
      
//       handleReset(); 
//     } else {
//       const errorData = await response.json();
//       alert(`Error: ${errorData.error}`);
//     }
//   } catch (err) {
//     console.error("Network Failure:", err);
//     alert("Could not connect to the server.");
//   } finally{
//     setLoading(false);
//   }
// };


const confirmShipment = async () => {
  setLoading(true);

  try {
    let finalFrontUrl = senderInfo.idFrontUrl || "";
    let finalReceiverUrl = receiverInfo.receiverIdUrl || ""; // 🌟 Updated fallback from receiverInfo cache

    // 1. AUTO-UPLOAD (Front File - UNTOUCHED)
    if (stagedFiles.frontFile) {
      const fileName = `${Date.now()}-front.${stagedFiles.frontFile.name.split('.').pop()}`;
      const { data, error } = await supabase.storage.from('documents').upload(`sender-ids/${fileName}`, stagedFiles.frontFile);
      if (error) throw new Error("Front ID upload failed");
      const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`sender-ids/${fileName}`);
      finalFrontUrl = publicUrl;
    }

    // 🌟 AUTO-UPLOAD (Receiver File - CHANGED FROM BACKFILE)
    if (stagedFiles.receiverFile) {
      const fileName = `${Date.now()}-receiver.${stagedFiles.receiverFile.name.split('.').pop()}`;
      const { data, error } = await supabase.storage.from('documents').upload(`receiver-ids/${fileName}`, stagedFiles.receiverFile);
      if (error) throw new Error("Receiver ID upload failed");
      const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`receiver-ids/${fileName}`);
      finalReceiverUrl = publicUrl;
    }

    const verifiedUserId = userId ? Number(userId) : null;
    if (!verifiedUserId || isNaN(verifiedUserId)) {
      alert("Error: Active User Session ID could not be identified. Please try logging in again.");
      setLoading(false);
      return;
    }

    // 2. Prepare the payload
    const payload = {
      userId: verifiedUserId, 
      shipment: {
        trackingId: String(shipmentId || ""),
        senderType: String(senderInfo.senderType || ""),
        senderName: String(senderInfo.fullName || ""),
        senderCity: String(senderInfo.city || ""),
        senderIdType: String(senderInfo.idType || ""),
        senderAddress: String(senderInfo.address || ""),
        senderContact: String(senderInfo.contactNum || ""),
        senderCountry: String(senderInfo.country || ""),
        senderState: String(senderInfo.state || ""),
        senderZip: String(senderInfo.zip || ""),
        
        senderIdFront: String(finalFrontUrl), // 🛑 Kept exactly as you had it
        receiverIdUrl: String(finalReceiverUrl), // 🌟 Updated key payload property target
        
        billingMethod: String(billingInfo.method || ""),
        billingSubtotal: String(billingInfo.subtotal || "0"),
        billingTotal: String(billingInfo.total || "0"),

        receiverName: String(receiverInfo.fullName || ""),
        receiverContact: String(receiverInfo.contactNumber || ""),
        receiverCountry: String(receiverInfo.country || ""),
        receiverCity: String(receiverInfo.city || ""),
        receiverAddress: String(receiverInfo.fullAddress || ""),
        receiverState: String(receiverInfo.state || ""),
        receiverZip: String(receiverInfo.zip || ""),
        receiverLandmark: String(receiverInfo.landmark || ""),

        weight: String(calculateGrandTotal() || "0"),
        date: String(new Date().toISOString()),
      },
      packages: packages.map((pkg) => ({
        packageId: String(pkg.id || Date.now()),
        profile: String(pkg.profile || ""),
        type: String(pkg.type || "Box"),
        hasHollow: String(pkg.hasHollow || "No"),
        dims: String(`${pkg.dims?.l || 0}x${pkg.dims?.w || 0}x${pkg.dims?.h || 0}`),
        cbm: String(pkg.cbm || "0"),
        items: pkg.items.map((item) => ({
          desc: String(item.description || ""),
          weight: String(item.weight || "0"),
          qty: Number(item.qty || 1), 
          price: String(item.price || "0"),
          hsCode: String(item.hsCode || ""),
        })),
      })),
    };

    // 3. Network Request to your MySQL Backend
    const response = await fetch('https://sewaro-backend.onrender.com/api/shipments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      alert(`Success! ${result.message || "Shipment Saved"}`);
      
      if (stagedFiles.frontPreview) URL.revokeObjectURL(stagedFiles.frontPreview);
      if (stagedFiles.receiverPreview) URL.revokeObjectURL(stagedFiles.receiverPreview); // 🌟 Revoke the correct preview pointer
      
      handleReset(); 
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (err) {
    console.error("Network Failure:", err);
    alert("Could not connect to the server.");
  } finally {
    setLoading(false);
  }
};

// const confirmShipment = async () => {
//   setLoading(true);

//   try {
//     let finalFrontUrl = senderInfo.idFrontUrl || "";
//     let finalBackUrl = senderInfo.idBackUrl || "";

//     // 1. AUTO-UPLOAD: If there are staged files that haven't been uploaded yet
//     if (stagedFiles.frontFile) {
//       const fileName = `${Date.now()}-front.${stagedFiles.frontFile.name.split('.').pop()}`;
//       const { data, error } = await supabase.storage.from('documents').upload(`sender-ids/${fileName}`, stagedFiles.frontFile);
//       if (error) throw new Error("Front ID upload failed");
//       const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`sender-ids/${fileName}`);
//       finalFrontUrl = publicUrl;
//     }

//     if (stagedFiles.backFile) {
//       const fileName = `${Date.now()}-back.${stagedFiles.backFile.name.split('.').pop()}`;
//       const { data, error } = await supabase.storage.from('documents').upload(`sender-ids/${fileName}`, stagedFiles.backFile);
//       if (error) throw new Error("Back ID upload failed");
//       const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`sender-ids/${fileName}`);
//       finalBackUrl = publicUrl;
//     }

//     // Safety check: If userId is completely missing from props/state, protect the database
//     const verifiedUserId = userId ? Number(userId) : null;
//     if (!verifiedUserId || isNaN(verifiedUserId)) {
//       alert("Error: Active User Session ID could not be identified. Please try logging in again.");
//       setLoading(false);
//       return;
//     }

//     // 2. Prepare the payload
//     const payload = {
//       userId: verifiedUserId, // Safe parsed absolute integer
//       shipment: {
//         trackingId: String(shipmentId || ""),
//         senderType: String(senderInfo.senderType || ""),
//         senderName: String(senderInfo.fullName || ""),
//         senderCity: String(senderInfo.city || ""),
//         senderIdType: String(senderInfo.idType || ""),
//         senderAddress: String(senderInfo.address || ""),
//         senderContact: String(senderInfo.contactNum || ""),
//         senderCountry: String(senderInfo.country || ""),
//         senderState: String(senderInfo.state || ""),
//         senderZip: String(senderInfo.zip || ""),
        
//         // FIXED: Now accurately passes the finalized cloud document target links
//         senderIdFront: String(finalFrontUrl), 
//         senderIdBack: String(finalBackUrl),
        
//         billingMethod: String(billingInfo.method || ""),
//         billingSubtotal: String(billingInfo.subtotal || "0"),
//         billingTotal: String(billingInfo.total || "0"),

//         receiverName: String(receiverInfo.fullName || ""),
//         receiverContact: String(receiverInfo.contactNumber || ""),
//         receiverCountry: String(receiverInfo.country || ""),
//         receiverCity: String(receiverInfo.city || ""),
//         receiverAddress: String(receiverInfo.fullAddress || ""),
//         receiverState: String(receiverInfo.state || ""),
//         receiverZip: String(receiverInfo.zip || ""),
//         receiverLandmark: String(receiverInfo.landmark || ""),

//         weight: String(calculateGrandTotal() || "0"),
//         date: String(new Date().toISOString()),
//       },
//       packages: packages.map((pkg) => ({
//         packageId: String(pkg.id || Date.now()),
//         profile: String(pkg.profile || ""),
//         type: String(pkg.type || "Box"),
//         hasHollow: String(pkg.hasHollow || "No"),
//         dims: String(`${pkg.dims?.l || 0}x${pkg.dims?.w || 0}x${pkg.dims?.h || 0}`),
//         cbm: String(pkg.cbm || "0"),
//         items: pkg.items.map((item) => ({
//           desc: String(item.description || ""),
//           weight: String(item.weight || "0"),
//           qty: Number(item.qty || 1), // Pass numeric configurations natively to align input hooks
//           price: String(item.price || "0"),
//           hsCode: String(item.hsCode || ""),
//         })),
//       })),
//     };

//     // 3. Network Request to your MySQL Backend
//     const response = await fetch('http://localhost:5000/api/shipments/confirm', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       alert(`Success! ${result.message || "Shipment Saved"}`);
      
//       if (stagedFiles.frontPreview) URL.revokeObjectURL(stagedFiles.frontPreview);
//       if (stagedFiles.backPreview) URL.revokeObjectURL(stagedFiles.backPreview);
      
//       handleReset(); 
//     } else {
//       const errorData = await response.json();
//       alert(`Error: ${errorData.error}`);
//     }
//   } catch (err) {
//     console.error("Network Failure:", err);
//     alert("Could not connect to the server.");
//   } finally {
//     setLoading(false);
//   }
// };


// reset the form after finishing shipment
  const handleReset = () => {
    localStorage.removeItem('shp_sender');
    localStorage.removeItem('shp_receiver');
    localStorage.removeItem('shp_packages'); 
    localStorage.removeItem('shp_active_id');

    // 2. Reset States to Empty
    setSenderInfo({ fullName: '', senderType: '', city: '', address: '', contactNum: '', idType: '' });
    setReceiverInfo({ fullName: '', contactNumber: '', country: 'Nepal', city: '', fullAddress: '' });
    setPackages([{
        id: Date.now(),
        profile: '',
        type: '',
        //type: '',
        hasHollow: null,
        dims: { l: 0, w: 0, h: 0 },
        cbm: 0,
        items: [{ id: Date.now() + 1, 
          description: '', 
          weight: 0, 
          qty: 1, 
          price: 0, 
          hsCode: '' }]
    }]);

    // 3. Optional: Reset global CBM/hollow states if you kept them outside the package array
    setCbmResult(0);
    setHasHollow(null);
    // setShipmentId(null);
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const timePart = now.getTime().toString().slice(-4);
    const nextId = `SHP-${datePart}-${timePart}`;
    setShipmentId(nextId);
    // Scroll to top so user sees Step 1 from the beginning
    window.scrollTo(0, 0);
    setStep(1);

  };

  const initialReceiverData = {
    fullName: '',
    idType: '',
    contactNumber: '',
    country: 'Nepal',
    state: '',
    zipCode: '',
    city: '',
    landmark: '',
    fullAddress: ''
  };

  // shipment id
  const [shipmentId, setShipmentId] = useState(() => {
    const savedId = localStorage.getItem('shp_active_id');
    if (savedId) return savedId;
    
    // Generate a unique ID based on the current date/time
    // Format: SHP-20240520-1234 (YearMonthDay-Last4DigitsOfTime)
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const timePart = now.getTime().toString().slice(-4);
    const newId = `SHP-${datePart}-${timePart}`;
    
    localStorage.setItem('shp_active_id', newId);
    return newId;
  });



  return (
    <div className="stepper-container">
      <h1 className="main-title">Shipment Details</h1>

      {/* Progress Tracker */}
      <div className="progress-bar">
        {steps.map((s, index) => (
          <div key={s.id} className={`step-item ${step >= s.id ? 'active' : ''}`}>
            <div className="step-number">{s.id}</div>
            <div className="step-label">{s.label}</div>
            
            {/* 
               Logic: 
               1. Only show line if it's NOT the last item (index < steps.length - 1)
               2. Add 'completed' class only if the NEXT step is also active 
            */}
            {index < steps.length - 1 && (
              <div className={`step-line ${step > s.id ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
{/* 🎯 Custom Pop-up Validation Banner Core Mount */}
    {validationError && (
      <ErrorModal 
        message={validationError} 
        onClose={() => setValidationError('')} 
      />
    )}
      <div className="form-card">
        <h2 className="section-title">{steps[step - 1].label}</h2>
        
        {/* Only show Form Content if we are on Step 1 */}
        {step === 1 && (
  <>


    <div className="tab-switcher">
      <button type="button" className="tab-btn active">Enter Address Details</button>
    </div>

    <div className="form-grid">
      {/* Left Column */}
      <div className="form-column">
        <h3 className="sub-header">Personal Information</h3>
        <div className="input-field">
          <label>Sender Type *</label>
          <select 
            value={senderInfo.senderType || ""} 
            onChange={(e) => updateSender('senderType', e.target.value)}
          >
            <option value="" disabled hidden>Select Type</option>
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="COMMERCIAL">COMMERCIAL</option>
          </select>              
        </div>
        
        <div className="input-field">
          <label>Full Name or Company Name: *</label>
          <input 
            type="text" 
            value={senderInfo.fullName || ""} 
            onChange={(e) => updateSender('fullName', e.target.value)} 
          />
        </div>
        
        <div className="input-field">
          <label>Contact number (10 Digits): *</label>
          <input 
            type="text" 
            placeholder="e.g. 9841234567"
            value={senderInfo.contactNum || ""} 
            onChange={(e) => updateSender('contactNum', e.target.value)}
          />                  
        </div>
        
        <div className="input-field inline">
          <div style={{ flex: 1 }}>
            <label>Verification ID (Optional):</label>
            <select 
              value={senderInfo.idType || ""} 
              onChange={(e) => updateSender('idType', e.target.value)}
            >
              <option value="" disabled hidden>Select ID</option>
              <option value="CITIZENSHIP">CITIZENSHIP</option>
              <option value="PASSPORT">PASSPORT</option>
            </select>
          </div>

          <div className="id-upload-row">
            <label>ID Front (Optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="file" 
                onChange={(e) => handleFileSelect(e, 'front')} 
                accept="image/*"
              />
              {(stagedFiles.frontPreview || senderInfo.idFrontUrl) && (
                <button type="button" onClick={() => clearImage('front')} className="btn-cross">✕</button>
              )}
            </div>

            {stagedFiles.frontPreview && (
              <div className="preview-container" style={{ marginTop: '10px' }}>
                <img 
                  src={stagedFiles.frontPreview} 
                  alt="Front Preview" 
                  onClick={() => setEnlargedImage(stagedFiles.frontPreview)} 
                  style={{ width: '80px', height: 'auto', cursor: 'zoom-in', borderRadius: '4px', border: '1px solid #ccc' }} 
                />
                <p style={{ fontSize: '10px', color: '#666', margin: '4px 0' }}>Click to see larger</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="form-column">
        <div className="input-field" style={{ marginTop: '40px' }}>
          <label>Country: *</label>
          <select 
            value={senderInfo.country || ''} 
            onChange={(e) => updateSender('country', e.target.value)}
          >
            <option value="" disabled>-- Select a Country --</option>
            {countryList.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label>Zip Code: </label>
          <input 
            type="text" 
            value={senderInfo.zip || ""} 
            onChange={(e) => updateSender('zip', e.target.value)} 
          />
        </div>
        
        <div className="input-field">
          <label>State: </label>
          <input 
            type="text" 
            value={senderInfo.state || ""} 
            onChange={(e) => updateSender('state', e.target.value)}
          />
        </div>
        
        <div className="input-field">
          <label>City: *</label>
          <input 
            type="text" 
            value={senderInfo.city || ""} 
            onChange={(e) => updateSender('city', e.target.value)} 
          />
        </div>
        
        <div className="input-field">
          <label>Address: *</label>
          <input 
            type="text" 
            value={senderInfo.address || ""} 
            onChange={(e) => updateSender('address', e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Footer Navigation Button Row Section */}
    <div style={{ marginTop: '30px', textAlign: 'right' }}>
      {/* <button 
        type="button" 
        onClick={handleProceedToStepTwo} 
        className="btn-next"
        style={{ padding: '10px 24px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Continue to Step 2
      </button> */}
    </div>
  </>
)}

        {/* Placeholder for Step 2 and 3 */}
        {/* Receiver's Information - Step 2 */}
       {step === 2 && (
  <div className="form-grid">
    {/* Left Column */}
    <div className="form-column">
      <h3 className="sub-header">Receiver's Details</h3>
      
      <div className="input-field">
        <label>Full Name*:</label>
        <input 
          type="text" 
          placeholder="Enter receiver's name" 
          value={receiverInfo.fullName}
          onChange={(e) => handleReceiverUpdate('fullName', e.target.value)} // UPDATED
        />
      </div>

      <div className="input-field">
        <label>Verification ID:</label>
        <select 
          value={receiverInfo.idType || ""}
          onChange={(e) => handleReceiverUpdate('idType', e.target.value)} // UPDATED
        >
          <option value="" disabled hidden>Select ID Type</option>
          <option value="CITIZENSHIP">CITIZENSHIP</option>
          <option value="PASSPORT">PASSPORT</option>
        </select>
      </div>
<div className="input-field id-upload-section" style={{ gridColumn: '1 / -1', marginTop: '10px', marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Receiver ID Document :
        </label>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="file" 
            onChange={(e) => handleFileSelect(e, 'receiver')} 
            accept="image/*"
            style={{ padding: '4px 0' }}
          />
          
          {/* Clear button if file preview or saved link exists */}
          {(stagedFiles.receiverPreview || receiverInfo.receiverIdUrl) && (
            <button 
              type="button" 
              onClick={() => clearImage('receiver')} 
              className="btn-cross"
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Live Staged Preview Window */}
        {/* Live Staged Preview Window */}
{stagedFiles.receiverPreview ? (
  <div style={{ marginTop: '10px', background: '#eaf4fc', padding: '10px', border: '1px dashed #007bff', borderRadius: '4px' }}>
    <span style={{ fontSize: '11px', color: '#007bff', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
      ✓ Image Staged (Will automatically save with shipment)
    </span>
    <img 
      src={stagedFiles.receiverPreview} 
      alt="Receiver ID Preview" 
      style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px', border: '1px solid #b3d7ff' }} 
    />
  </div>
) : receiverInfo.receiverIdUrl ? (
  /* Already Uploaded Preview Window */
  <div style={{ marginTop: '10px', background: '#f4fbf7', padding: '10px', border: '1px solid #28a745', borderRadius: '4px' }}>
    <span style={{ fontSize: '11px', color: '#28a745', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>✓ Saved to Cloud:</span>
    <img 
      src={receiverInfo.receiverIdUrl} 
      alt="Saved Receiver ID" 
      style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px', opacity: 0.9 }} 
    />
  </div>
) : null}
      </div>


      <div className="input-field">
        <label>Contact Number*:</label>
        <input 
          type="tel" 
          placeholder="e.g. 98XXXXXXXX" 
          value={receiverInfo.contactNumber}
          onChange={(e) => handleReceiverUpdate('contactNumber', e.target.value)} // UPDATED
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="form-column">
      <h3 className="sub-header">Delivery Address*</h3>
      
      <div className="input-field">
        <label>Country*:</label>
        <select 
          value={receiverInfo.country}
          onChange={(e) => handleReceiverUpdate('country', e.target.value)} // UPDATED
        >
          {countryList.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="form-grid-inner" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
        <div className="input-field">
          <label>State:</label>
          <input 
            type="text" 
            placeholder="Bagmati" 
            value={receiverInfo.state}
            onChange={(e) => handleReceiverUpdate('state', e.target.value)} // UPDATED
          />
        </div>
        <div className="input-field">
  <label>Zip Code:</label>
  <input  
    type="text"  
    placeholder="44600"  
    value={receiverInfo.zip || ''} // 🛡️ FIXED: Reads directly from 'zip' state cache
    onChange={(e) => handleReceiverUpdate('zip', e.target.value)} // 🛡️ FIXED: Saves cleanly to 'zip' key
  />
</div>
      </div>

      <div className="input-field">
        <label>City*:</label>
        <input 
          type="text" 
          placeholder="Kathmandu" 
          value={receiverInfo.city}
          onChange={(e) => handleReceiverUpdate('city', e.target.value)} // UPDATED
        />
      </div>

      <div className="input-field">
        <label>Area / Landmark*:</label>
        <input 
          type="text" 
          placeholder="e.g. Near Kalanki Temple" 
          value={receiverInfo.landmark}
          onChange={(e) => handleReceiverUpdate('landmark', e.target.value)} // UPDATED
        />
      </div>

      <div className="input-field">
        <label>Full Address*:</label>
        <input 
          type="text" 
          placeholder="House no, Street name" 
          value={receiverInfo.fullAddress}
          onChange={(e) => handleReceiverUpdate('fullAddress', e.target.value)} // UPDATED
        />
      </div>
    </div>
  </div>
)}
        {step === 3 && (
  <div className="package-info-section">
    <h2 className="main-title">Package Information*</h2>

    {packages.map((pkg, pIdx) => (
      <div key={pkg.id} className="package-blog-card">
        <div className="package-card-header">
          <h3># {pIdx + 1} Package Details</h3>
          {packages.length > 1 && (
            <button className="remove-pkg-link" onClick={() => removePackage(pkg.id)}>
              Remove Package
            </button>
          )}
        </div>

        {/* 1. Profile & Type Selection */}
        <div className="form-grid">
          <div className="input-field">
            <label>Package Profile*:</label>
            <select 
              value={pkg.profile || ""} 
              onChange={(e) => updatePackageField(pkg.id, 'profile', e.target.value)}
            >
              <option value="" disabled hidden>Select Profile</option>
              <option>Carton Cargo</option>
              <option>Document Cargo</option>
              <option>Fragile Items Cargo</option>
            </select>
          </div>

          <div className="input-field">
            <label>Package Type:</label>
            <select 
              value={pkg.type || ""} 
              onChange={(e) => updatePackageField(pkg.id, 'type', e.target.value)}
            >
              <option value="" disabled hidden>Select Type</option>
              <option>Normal (Standard Package)</option>
              <option>Special (Meat Products Only)</option>
            </select>
            <p className="hint-text">*Note: Special type is strictly for perishable meat products.</p>
          </div>
        </div>

        <hr className="form-divider" />

        {/* 2. Hollow Question & CBM Calculator */}
        <div className="hollow-section">
          <label className="section-label">Is there any hollow item in the package?</label>
          <div className="button-toggle-group">
            <button 
              className={`tab-btn ${pkg.hasHollow === 'yes' ? 'active' : ''}`} 
              onClick={() => updatePackageField(pkg.id, 'hasHollow', 'yes')}
            >Yes</button>
            <button 
              className={`tab-btn ${pkg.hasHollow === 'no' ? 'active' : ''}`} 
              onClick={() => updatePackageField(pkg.id, 'hasHollow', 'no')}
            >No</button>
          </div>

          {pkg.hasHollow === 'yes' && (
            <div className="cbm-calculator-box">
              <h4>📏 CBM & Volumetric Weight Calculator</h4>
              <div className="calc-inputs">
                <div className="calc-group">
                  <label>Length (cm)</label>
                  <input 
                    type="number" min="0" placeholder="0" 
                    value={pkg.dims?.l || 0}
                    onChange={(e) => updatePackageDims(pkg.id, 'l', e.target.value)} 
                  />
                </div>
                <div className="calc-group">
                  <label>Breadth (cm)</label>
                  <input 
                    type="number" min="0" placeholder="0" 
                    value={pkg.dims?.w || 0}
                    onChange={(e) => updatePackageDims(pkg.id, 'w', e.target.value)} 
                  />
                </div>
                <div className="calc-group">
                  <label>Height (cm)</label>
                  <input 
                    type="number" min="0" placeholder="0" 
                    value={pkg.dims?.h || 0}
                    onChange={(e) => updatePackageDims(pkg.id, 'h', e.target.value)} 
                  />
                </div>
                <button className="calc-btn" onClick={() => calculateCBM(pkg.id)}>Calculate</button>
              </div>

              {pkg.cbm > 0 && (
                <div className="result-display">
                  <p className="result-text">Total Volume: <strong>{pkg.cbm.toFixed(4)} CBM</strong></p>
                  <div className="weight-conversion">
                    <span>Est. Volumetric Weight:</span>
                    {/* 🛡️ FIXED: Safe optional chaining checks inside calculation badges */}
                    <div className="badge">
                      {(((pkg.dims?.l || 0) * (pkg.dims?.w || 0) * (pkg.dims?.h || 0)) / 5000).toFixed(2)} KG
                    </div>
                    <div className="badge">
                      {((((pkg.dims?.l || 0) * (pkg.dims?.w || 0) * (pkg.dims?.h || 0)) / 5000) * 2.20462).toFixed(2)} LBS
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Dynamic Items Table */}
        <div className="items-table-container">
          <h3 className="sub-header">Items Category</h3>
          <table className="package-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Weight (kg)</th>
                <th>Price (USD)</th>
                <th>HS Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pkg.items && pkg.items.map((item) => (
                <tr key={item.id}>
                  <td className="desc-cell">
                    <textarea 
                      placeholder="Description" 
                      className="auto-grow-input"
                      value={item.description || ""} 
                      onChange={(e) => {
                        e.target.style.height = 'inherit';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        updateItem(pkg.id, item.id, 'description', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      min="0" 
                      className="lengthy-input" 
                      value={item.qty || ""} 
                      onChange={(e) => updateItem(pkg.id, item.id, 'qty', e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      min="0" 
                      className="lengthy-input" 
                      value={item.weight || ""} 
                      onChange={(e) => updateItem(pkg.id, item.id, 'weight', e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      min="0" 
                      className="lengthy-input" 
                      value={item.price || ""} 
                      onChange={(e) => updateItem(pkg.id, item.id, 'price', e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="lengthy-input" 
                      value={item.hsCode || ""} 
                      onChange={(e) => updateItem(pkg.id, item.id, 'hsCode', e.target.value)} 
                    />
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => removeItem(pkg.id, item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="package-footer-row">
            <button className="add-item-btn" onClick={() => addItemToPackage(pkg.id)}>+ Add Item</button>
            <div className="total-weight-display">
              <span>Total Weight:</span>
              <input
                type="number"
                step="0.01"
                min="0"
                className="total-weight-input"
                placeholder="0.00"
                value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : ""} 
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (typeof setPackages === "function") {
                    setPackages(prevPackages => 
                      prevPackages.map((p) => 
                        p.id === pkg.id ? { ...p, total_weight: rawValue } : p
                      )
                    );
                  } else {
                    pkg.total_weight = rawValue;
                  }
                }}
              />
              <span className="weight-unit-label">kg</span>
            </div>
          </div>
        </div>
      </div>
    ))}

    <button className="add-package-outline-btn" onClick={addPackage}>
      Add another package +
    </button>
  </div>
)}
      {/* {step === 4 && (
  <div className="billing-container">
  <h3 className="sub-header">Billing & Delivery Selection</h3>
  
  <div className="billing-table-wrapper">
    <table className="billing-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Package Profile</th>
          <th>Weight Details</th>
          <th>Rate</th>
          <th>Door to Door?</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((pkg, index) => {
          // 🌟 FIXED: Point this directly to your updated helper function!
          const actualWt = calculateTotalWeight(pkg.items);
          const chargeableWt = getChargeableWeight(actualWt);
          const rate = getPricePerKg(chargeableWt);

          return (
            <tr key={pkg.id}>
              <td className="pkg-num">Pkg {index + 1}</td>
              <td>
                <div className="pkg-profile-tag">{pkg.profile || "Standard"}</div>
                <small className="pkg-type-text">{pkg.type}</small>
              </td>
              <td>
                <div className="weight-info">
                  <span>Actual: <strong>{actualWt.toFixed(2)}kg</strong></span>
                  <span>Chargeable: <strong className="highlight-text">{chargeableWt}kg</strong></span>
                </div>
              </td>
              <td>
                <span className="rate-badge">Rs {rate}/kg</span>
              </td>
              <td className="checkbox-cell">
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    checked={pkg.doorToDoor || false}
                    onChange={(e) => toggleDoorToDoor(pkg.id, e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">+Rs 500</span>
                </label>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  </div>
)} */}


{step === 4 && (
  <div className="billing-container">
    <h3 className="sub-header">Billing & Delivery Selection</h3>
    
    <div className="billing-table-wrapper">
      <table className="billing-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Package Profile</th>
            <th>Weight Details</th>
            <th>Rate</th>
            <th>Door to Door?</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => {
            // 🌟 FIXED: Use the user's custom-entered manual weight field fallback to 0 if empty
            const actualWt = parseFloat(pkg.total_weight) || 0;
            const chargeableWt = getChargeableWeight(actualWt);
            const rate = getPricePerKg(chargeableWt);

            return (
              <tr key={pkg.id}>
                <td className="pkg-num">Pkg {index + 1}</td>
                <td>
                  <div className="pkg-profile-tag">{pkg.profile || "Standard"}</div>
                  <small className="pkg-type-text">{pkg.type}</small>
                </td>
                <td>
                  <div className="weight-info">
                    <span>Actual: <strong>{actualWt.toFixed(2)}kg</strong></span>
                    <span>Chargeable: <strong className="highlight-text">{chargeableWt}kg</strong></span>
                  </div>
                </td>
                <td>
                  <span className="rate-badge">Rs {rate}/kg</span>
                </td>
                <td className="checkbox-cell">
                  <label className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={pkg.doorToDoor || false}
                      onChange={(e) => toggleDoorToDoor(pkg.id, e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">+Rs 500</span>
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}
{/* {step === 4 && (
  <div className="billing-container">
    <h3 className="sub-header">Billing & Delivery Selection</h3>
    
    <div className="billing-table-wrapper">
      <table className="billing-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Package Profile</th>
            <th>Weight Details</th>
            <th>Rate</th>
            <th>Door to Door?</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => {
            // 🌟 FIXED: Sum the raw item weights exactly as typed, completely ignoring the item quantities
            const actualWt = (pkg.items || []).reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
            const chargeableWt = getChargeableWeight(actualWt);
            const rate = getPricePerKg(chargeableWt);

            return (
              <tr key={pkg.id}>
                <td className="pkg-num">Pkg {index + 1}</td>
                <td>
                  <div className="pkg-profile-tag">{pkg.profile || "Standard"}</div>
                  <small className="pkg-type-text">{pkg.type}</small>
                </td>
                <td>
                  <div className="weight-info">
                    <span>Actual: <strong>{actualWt.toFixed(2)}kg</strong></span>
                    <span>Chargeable: <strong className="highlight-text">{chargeableWt}kg</strong></span>
                  </div>
                </td>
                <td>
                  <span className="rate-badge">Rs {rate}/kg</span>
                </td>
                <td className="checkbox-cell">
                  <label className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={pkg.doorToDoor || false}
                      onChange={(e) => toggleDoorToDoor(pkg.id, e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">+Rs 500</span>
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)} */}

      {/* {step === 5 && (
  <div className="invoice-display-container">
    <div id="printable-invoice" className="invoice-card">
      <div className="invoice-header">
        <div className="company-info">
          <h1 className="invoice-title">Namaste Sewaro Cargo</h1>

          <p className="shipment-id">ID: #NSC-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p className="date">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="qr-section">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=SHP-INVOICE-${Date.now()}`} 
            alt="Invoice QR" 
          />
          <span className="qr-hint">Scan to Track</span>
        </div>
      </div>

      <div className="invoice-body">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Package Details</th>
              <th>Actual Wt.</th>
              <th>Chargeable Wt.</th>
              <th>Rate/kg</th>
              <th>Door To Door Delivery</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, idx) => {
              const weight = calculateTotalWeight(pkg.items);
              const chgWeight = getChargeableWeight(weight);
              const rate = getPricePerKg(chgWeight);
              const doorToDoorCharge = pkg.doorToDoor ? 500 : 0;
              const subtotal = (chgWeight * rate) + doorToDoorCharge;

              return (
                <tr key={pkg.id}>
                  <td>
                    <strong>Package #{idx + 1}</strong>
                    <br /><small>{pkg.profile} | {pkg.type}</small>
                  </td>
                  <td>{weight} kg</td>
                  <td>{chgWeight} kg</td>
                  <td>₨ {rate}</td>
                  <td>{pkg.doorToDoor ? "Yes (Rs 500)" : "No"}</td>
                  <td>Rs {subtotal.toLocaleString()}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="invoice-summary">
        <div className="summary-row grand-total">
          <span>Amount Payable:</span>
          <strong>₨ {packages.reduce((sum, pkg) => {
            const chgWt = getChargeableWeight(calculateTotalWeight(pkg.items));
            return sum + (chgWt * getPricePerKg(chgWt)) + (pkg.doorToDoor ? 500 : 0);
          }, 0).toLocaleString()}</strong>
        </div>
      </div>
    </div>

    <div className="invoice-actions no-print">
      <button className="print-btn" onClick={() => window.print()}>
        🖨️ Print Invoice
      </button>
      {/* This is the  Done button }
      <button className="done-btn" onClick={confirmShipment}>
        ✅ Done & Start New Shipment
      </button>
    </div>
  </div>
)} */}

{/* {step === 5 && (
  <div className="invoice-display-container">
    <div id="printable-invoice" className="invoice-card">
      
    
      <h1 className="invoice-main-title">Invoice</h1>
      <div className="invoice-meta-text">
        <p><strong>Invoice #:</strong> {previewTrackingId}</p>
        <p><strong>Package Number:</strong> {packages.length}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
        <p><strong>Payment mode:</strong> {billingInfo.method || "Cash"}</p>
      </div>

  
      <div style={{ display: 'flex', width: '100%' }}>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left' }}>Shipper Information</div>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', borderLeft: '2px solid #fff' }}>Receiver Information</div>
      </div>
      
      <div className="info-split-grid" style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
        <div className="info-column" style={{ flex: 1, paddingRight: '15px', boxSizing: 'border-box' }}>
          <p><strong>Shipper Name:</strong> {senderInfo.fullName || "N/A"}</p>
          <p><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city}, {senderInfo.country}</p>
          <p><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
          <p><strong>Email:</strong> {senderInfo.email || "N/A"}</p>
        </div>
        <div className="info-column" style={{ flex: 1, paddingLeft: '15px', borderLeft: '1px solid #ccc', boxSizing: 'border-box' }}>
          <p><strong>Receiver Name:</strong> {receiverInfo.fullName || "N/A"}</p>
          <p><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city}, {receiverInfo.country}</p>
          <p><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
          <p><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
        </div>
      </div>

      <div className="invoice-section-banner" style={{ marginTop: '25px', marginBottom: '0' }}>Package Details</div>
      
      <table className="corp-invoice-table">
        <thead>
          <tr>
            <th style={{ width: '8%' }}>S.N</th>
            <th>Description</th>
            <th style={{ width: '25%' }}>HS CODE</th>
            <th style={{ width: '15%' }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {packages.flatMap((pkg, pkgIdx) => 
            (pkg.items || []).map((item, itemIdx) => (
              <tr key={`${pkg.id}-${itemIdx}`}>
                <td>{itemIdx + 1}</td>
                <td className="text-left">
                  {item.description || `${pkg.profile || "Cargo Item"} (${pkg.type || "Parcel"})`}
                </td>
                <td>{item.hsCode || "—"}</td>
                <td>{item.qty || 1}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

  
      <div className="invoice-footer-grid" style={{ display: 'flex', width: '100%', gap: '20px', marginTop: '20px' }}>
        
        <div className="comments-block" style={{ flex: 1.2 }}>
          <div className="invoice-section-banner" style={{ fontSize: '11px', padding: '4px 8px' }}>Comments</div>
          <ul>
          </ul>
        </div>

        <div className="financials-block" style={{ flex: 0.8, background: '#f4f6f8', padding: '15px', borderRadius: '4px', boxSizing: 'border-box' }}>
          {(() => {
            const aggregateWeight = packages.reduce((sum, p) => {
              const pWeight = (p.items || []).reduce((subSum, item) => subSum + (parseFloat(item.weight) || 0), 0);
              return sum + pWeight;
            }, 0);

            const totalPayable = packages.reduce((sum, pkg) => {
              const rawWeight = (pkg.items || []).reduce((subSum, item) => subSum + (parseFloat(item.weight) || 0), 0);
              const chgWt = typeof getChargeableWeight === 'function' ? getChargeableWeight(rawWeight) : rawWeight;
              const rate = typeof getPricePerKg === 'function' ? getPricePerKg(chgWt) : 0;
              const doorToDoorCharge = pkg.doorToDoor ? 500 : 0;
              
              return sum + (chgWt * rate) + doorToDoorCharge;
            }, 0);

            return (
              <>
                <p><strong>Total Weight:</strong> {aggregateWeight.toFixed(2)} Kg</p>
                <p><strong>Weight charge:</strong> {billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</p>
                
                <div className="grand-total-row" style={{ margin: '10px 0', padding: '5px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                  <span style={{ fontWeight: 'bold' }}>Total: </span>
                  <span style={{ fontWeight: 'bold' }}>{billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', padding: '10px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Scan to Track Shipment
                  </span>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
                    alt="Tracking Invoice QR Code Matrix"
                    style={{ width: '110px', height: '110px', display: 'block' }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', marginTop: '4px', color: '#222', fontWeight: 'bold' }}>
                    {previewTrackingId}
                  </span>
                </div>

                <p className="thank-you-msg" style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
                  Thank you for your business!
                </p>
              </>
            );
          })()}
        </div>

      </div>
    </div>

    <div className="label-printable-target">
  <ShippingLabel 
    previewTrackingId={previewTrackingId}
    packages={packages}
    senderInfo={senderInfo}
    receiverInfo={receiverInfo}
    billingInfo={billingInfo}
  />
</div>

<div className="invoice-actions no-print" style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
  
  <button 
    className="print-btn" 
    onClick={() => {
      document.body.classList.add('print-mode-invoice-only');
      setTimeout(() => {
        window.print();
        document.body.classList.remove('print-mode-invoice-only');
      }, 50);
    }} 
    style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
  >
    🖨️ Print Invoice
  </button>
  
  <button 
            className="print-btn" 
            onClick={() => {
              document.body.classList.add('print-mode-label-only');
              setTimeout(() => {
                window.print();
                document.body.classList.remove('print-mode-label-only');
              }, 50);
            }} 
            style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', background: '#e0a800', color: '#000', border: 'none', borderRadius: '4px' }}
          >
            🏷️ Print Label
          </button>

  <button className="done-btn" onClick={() => confirmShipment(previewTrackingId)} style={{ padding: '10px 20px', cursor: 'pointer', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold' }}>
    ✅ Done & Start New Shipment
  </button>
</div>
  </div>
)} */}

{step === 5 && (
  <div className="invoice-display-container">
    <div id="printable-invoice" className="invoice-card">
      
      {/* 🧾 Document Title & Meta Block */}
      <h1 className="invoice-main-title">Invoice</h1>
      <div className="invoice-meta-text">
        <p><strong>Invoice #:</strong> {previewTrackingId}</p>
        <p><strong>Package Number:</strong> {packages.length}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
        <p><strong>Payment mode:</strong> {billingInfo.method || "Cash"}</p>
      </div>

      {/* 👥 Split Address Banner Header Grid */}
      <div style={{ display: 'flex', width: '100%' }}>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left' }}>Shipper Information</div>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', borderLeft: '2px solid #fff' }}>Receiver Information</div>
      </div>
      
      <div className="info-split-grid" style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
        <div className="info-column" style={{ flex: 1, paddingRight: '15px', boxSizing: 'border-box' }}>
          <p><strong>Shipper Name:</strong> {senderInfo.fullName || "N/A"}</p>
          <p><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city}, {senderInfo.country}</p>
          <p><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
          <p><strong>Email:</strong> {senderInfo.email || "N/A"}</p>
        </div>
        <div className="info-column" style={{ flex: 1, paddingLeft: '15px', borderLeft: '1px solid #ccc', boxSizing: 'border-box' }}>
          <p><strong>Receiver Name:</strong> {receiverInfo.fullName || "N/A"}</p>
          <p><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city}, {receiverInfo.country}</p>
          <p><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
          <p><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
        </div>
      </div>

      {/* 📦 Package Breakdown Section Banner */}
      <div className="invoice-section-banner" style={{ marginTop: '25px', marginBottom: '0' }}>Package Details</div>
      
      <table className="corp-invoice-table">
        <thead>
          <tr>
            <th style={{ width: '8%' }}>S.N</th>
            <th>Description</th>
            <th style={{ width: '25%' }}>HS CODE</th>
            <th style={{ width: '15%' }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {packages.flatMap((pkg, pkgIdx) => 
            (pkg.items || []).map((item, itemIdx) => (
              <tr key={`${pkg.id}-${itemIdx}`}>
                <td>{itemIdx + 1}</td>
                <td className="text-left">
                  {item.description || `${pkg.profile || "Cargo Item"} (${pkg.type || "Parcel"})`}
                </td>
                <td>{item.hsCode || "—"}</td>
                <td>{item.qty || 1}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 📋 Bottom Section: Terms & Totals Row */}
      <div className="invoice-footer-grid" style={{ display: 'flex', width: '100%', gap: '20px', marginTop: '20px' }}>
        
        {/* Left Side Column: Legal Terms Notes */}
        <div className="comments-block" style={{ flex: 1.2 }}>
          <div className="invoice-section-banner" style={{ fontSize: '11px', padding: '4px 8px' }}>Comments</div>
          <ul>
            {/* Legal compliance comments can safely go here */}
          </ul>
        </div>

        {/* Right Side Column: Financial Aggregations using the manually entered weight values */}
        <div className="financials-block" style={{ flex: 0.8, background: '#f4f6f8', padding: '15px', borderRadius: '4px', boxSizing: 'border-box' }}>
          {(() => {
            // 🌟 FIXED: Target custom manual package weights for overall sum compilation
            const aggregateWeight = packages.reduce((sum, p) => {
              return sum + (parseFloat(p.total_weight) || 0);
            }, 0);

            // 🌟 FIXED: Recalculate financial breakdown using custom total_weight records
            const totalPayable = packages.reduce((sum, pkg) => {
              const rawWeight = parseFloat(pkg.total_weight) || 0;
              const chgWt = typeof getChargeableWeight === 'function' ? getChargeableWeight(rawWeight) : rawWeight;
              const rate = typeof getPricePerKg === 'function' ? getPricePerKg(chgWt) : 0;
              const doorToDoorCharge = pkg.doorToDoor ? 500 : 0;
              
              return sum + (chgWt * rate) + doorToDoorCharge;
            }, 0);

            return (
              <>
                <p><strong>Total Weight:</strong> {aggregateWeight.toFixed(2)} Kg</p>
                <p><strong>Weight charge:</strong> {billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</p>
                
                <div className="grand-total-row" style={{ margin: '10px 0', padding: '5px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                  <span style={{ fontWeight: 'bold' }}>Total: </span>
                  <span style={{ fontWeight: 'bold' }}>{billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</span>
                </div>
                
                {/* 🌟 Live Tracking QR Component Block */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', padding: '10px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Scan to Track Shipment
                  </span>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
                    alt="Tracking Invoice QR Code Matrix"
                    style={{ width: '110px', height: '110px', display: 'block' }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', marginTop: '4px', color: '#222', fontWeight: 'bold' }}>
                    {previewTrackingId}
                  </span>
                </div>

                <p className="thank-you-msg" style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
                  Thank you for your business!
                </p>
              </>
            );
          })()}
        </div>

      </div>
    </div>

    <div className="label-printable-target">
      <ShippingLabel 
        previewTrackingId={previewTrackingId}
        packages={packages}
        senderInfo={senderInfo}
        receiverInfo={receiverInfo}
        billingInfo={billingInfo}
      />
    </div>

    {/* Action Control Buttons Row */}
    <div className="invoice-actions no-print" style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
      <button 
        className="print-btn" 
        onClick={() => {
          document.body.classList.add('print-mode-invoice-only');
          setTimeout(() => {
            window.print();
            document.body.classList.remove('print-mode-invoice-only');
          }, 50);
        }} 
        style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        🖨️ Print Invoice
      </button>
      
      <button 
        className="print-btn" 
        onClick={() => {
          document.body.classList.add('print-mode-label-only');
          setTimeout(() => {
            window.print();
            document.body.classList.remove('print-mode-label-only');
          }, 50);
        }} 
        style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', background: '#e0a800', color: '#000', border: 'none', borderRadius: '4px' }}
      >
        🏷️ Print Label
      </button>

      <button className="done-btn" onClick={() => confirmShipment(previewTrackingId)} style={{ padding: '10px 20px', cursor: 'pointer', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold' }}>
        ✅ Done & Start New Shipment
      </button>
    </div>
  </div>
)}






        {/* <div className="form-footer">
  {step > 1 && (
    <button className="tab-btn" onClick={() => setStep(step - 1)}>← Back</button>
  )}

  {step === 3 && (
    <button className="next-btn" onClick={() => setStep(4)}>Finish Shipment →</button>
  )}

  {step === 4 && (
    <button className="next-btn" onClick={() => setStep(5)}>Generate Invoice & QR →</button>
  )}

  
  {step < 3 && (
    <button 
      className="next-btn" 
      onClick={(e) => {
        if (step === 1) {
          handleProceedToStepTwo(e); // 🛡️ Checks your custom validation rules first!
        } else {
          setStep(step + 1); // Step 2 proceeds to Step 3 smoothly without checks
        }
      }}
    >
      Next Step →
    </button>
  )}
</div> */}
<div className="form-footer">
  {/* 1. BACK BUTTON: Visible on Steps 2, 3, and 4 */}
  {step > 1 && step < 5 && (
    <button type="button" className="tab-btn" onClick={() => setStep(step - 1)}>
      ← Back
    </button>
  )}

  {/* 2. STEP 1 BUTTON: Only visible on Step 1 */}
  {step === 1 && (
    <button type="button" className="next-btn" onClick={handleNextNavigation}>
      Next Step →
    </button>
  )}

  {/* 3. STEP 2 BUTTON: Only visible on Step 2 */}
  {step === 2 && (
    <button type="button" className="next-btn" onClick={handleNextNavigation}>
      Next Step →
    </button>
  )}

  {/* 4. STEP 3 BUTTON: Only visible on Step 3 */}
  {step === 3 && (
    <button type="button" className="next-btn" onClick={handleNextNavigation}>
      Finish Shipment →
    </button>
  )}

  {/* 5. STEP 4 BUTTON: Only visible on Step 4 */}
  {step === 4 && (
    <button type="button" className="next-btn" onClick={handleNextNavigation}>
      Generate Invoice & QR →
    </button>
  )}
</div>
        


        {/* <div className="form-footer">
          {step < 3 && (
            <button className="next-btn" onClick={() => setStep(step + 1)}>Next Step →</button>
          )}
          {step === 3 && (
            <button className="next-btn" style={{background: 'black'}}>Finish Shipment</button>
          )}
        </div> */}
        {enlargedImage && (
  <div 
    className="image-overlay" 
    onClick={() => setEnlargedImage(null)}
    style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000, cursor: 'zoom-out'
    }}
  >
    <img src={enlargedImage} style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '8px' }} />
  </div>
)}
      </div>
      
    </div>
  );
};

export default ShipmentStepper;